import axios from 'axios';
import fetchCookie = require('fetch-cookie');
import { writeFileSync } from 'fs';
import { MWBot, WikiError } from 'mediawiki2';
import nodeFetch from 'node-fetch';
import { firefox } from 'playwright';
import { CookieJar } from 'tough-cookie';
// import gifski from './gifski';

// import { getLogger } from './loggers';
// import { Tweet, processTweetBody } from './twitter';

// const logger = getLogger('wiki');

const baseUrl = 'https://wiki.biligame.com/idolypride';

export default class {
  private bot: MWBot;
  private lock: ILock;

  constructor(lock: ILock) {
    this.bot = new MWBot(`${baseUrl}/api.php`);
    this.lock = lock;
    const updateCsrfToken = this.bot.updateCsrfToken.bind(this.bot);
    this.bot.updateCsrfToken = function () {
      setTimeout(() => {
        (this as any).lastCsrfToken = undefined;
      }, 7200000);
      return updateCsrfToken();
    }.bind(this.bot);
  }

  public login = (sessdata: string) =>
    firefox.launch().then((browser) => {
      const jar = (this.bot as any).cookieJar as CookieJar;
      return browser.newPage().then((page) =>
        page
          .context()
          .addCookies([
            {
              name: 'SESSDATA',
              value: sessdata,
              domain: '.biligame.com',
              path: '/',
            },
          ])
          .then(() => page.route('**/*.{png,jpg,jpeg,gif}', (route) => route.abort()))
          .then(() => page.route('*://*.baidu.com/**', (route) => route.abort()))
          .then(() => page.goto(`${baseUrl}/index.php?curid=2`, { waitUntil: 'networkidle' }))
          .then(() => {
            // logger.info('logging in via browser...');
            return page.context().cookies();
          })
          .then((cookies) => {
            const uidIndex = cookies.findIndex((cookie) => cookie.name === 'gamecenter_wiki_UserName');
            if (!uidIndex) throw new Error('auth error');
            return Promise.all(cookies.map(({ name, value, domain, path }) => jar.setCookie(`${name}=${value}; Domain=${domain}; Path=${path}`, baseUrl))).then(() => cookies[uidIndex].value);
          })
          .then((uid) => {
            // logger.info(`finished logging in via browser, wiki username: ${uid}`);
            this.bot.fetch = (fetchCookie as any)(nodeFetch, jar);
            return browser.close();
          })
          .catch((err: Error) =>
            browser.close().then(() => {
              //   logger.fatal(`error logging in via browser, error: ${err}`);
              process.exit(0);
            })
          )
      );
    });

  private fetchMedia = (url: string): Promise<string> =>
    new Promise<ArrayBuffer>((resolve, reject) => {
      //   logger.info(`fetching ${url}`);
      const fetch = () =>
        axios({
          method: 'get',
          url,
          responseType: 'arraybuffer',
          timeout: 150000,
        })
          .then((res) => {
            if (res.status === 200) {
              //   logger.info(`successfully fetched ${url}`);
              resolve(res.data);
            } else {
              //   logger.error(`failed to fetch ${url}: ${res.status}`);
              reject();
            }
          })
          .catch((err) => {
            // logger.error(`failed to fetch ${url}: ${err instanceof Error ? err.message : err}`);
            // logger.info(`trying to fetch ${url} again...`);
            fetch();
          });
      fetch();
    }).then((data) =>
      (([_, filename, ext]) => {
        if (ext) {
          const mediaFileName = `${filename}.${ext}`;
          writeFileSync(mediaFileName, Buffer.from(data));
          return ext === 'mp4' ? gifski(mediaFileName, 320) : Promise.resolve(mediaFileName);
        }
        // logger.warn('unable to find MIME type of fetched media, failing this fetch');
        throw Error();
      })(/([^/]*)\?format=([a-z]+)&/.exec(url) ?? /.*\/([^/]*)\.([^?]+)/.exec(url))
    );

  private uploadMediaItems = (tweet: Tweet, fileNamePrefix: string, indexOffset = 0) => {
    const mediaItems: Promise<string>[] = [];
    if (tweet.extended_entities) {
      tweet.extended_entities.media.forEach((media, index) => {
        let url;
        if (media.type === 'photo') {
          url = media.media_url_https.replace(/\.([a-z]+)$/, '?format=$1') + '&name=orig';
        } else {
          url = media.video_info.variants
            .filter((variant) => variant.bitrate !== undefined)
            .sort((var1, var2) => var2.bitrate - var1.bitrate)
            .map((variant) => variant.url)[0]; // largest video
        }
        const mediaPromise = this.fetchMedia(url).then((mediaFileName) => {
          const filename = `${fileNamePrefix}${indexOffset + index + 1}.${mediaFileName.split('.')[1]}`;
          //   logger.info(`uploading ${mediaFileName} as ${filename}...`);
          return this.bot
            .simpleUpload({
              file: mediaFileName,
              filename,
            })
            .then(() => filename)
            .catch((error) => {
              if (error instanceof WikiError && error.data.result === 'Warning') {
                const { duplicate } = error.data.warnings;
                if (duplicate) return duplicate[0];
              } else throw error;
            });
        });
        mediaItems.push(mediaPromise);
      });
    }
    return Promise.all(mediaItems);
  };

  public appendMedia = (tweet: Tweet, genre: string, indexOffset: number): Promise<WikiEditResult> => {
    const { pageTitle } = processTweetBody(tweet);
    const pageLongTitle = `公告/${pageTitle}`;
    const mediaFilePrefix = `公告-${genre}-${pageTitle}-`;
    return this.uploadMediaItems(tweet, mediaFilePrefix, indexOffset)
      .then((fileNames) => {
        // logger.info(`updating page ${pageLongTitle}...`);
        return this.bot
          .edit({
            title: pageLongTitle,
            appendtext: `${fileNames.map((fileName) => `[[文件:${fileName}|无框|左]]\n`).join('')}`,
            bot: true,
            notminor: true,
            nocreate: true,
          })
          .then(({ new: isNewPost, newtimestamp, pageid, result, title }) => ({
            pageid,
            title,
            new: isNewPost,
            mediafiles: fileNames,
            result,
            timestamp: new Date(newtimestamp).toString(),
          }));
      })
      .catch((error) => {
        // logger.error(`error updating page, error: ${error}`);
        return {
          pageid: undefined as number,
          title: pageLongTitle,
          new: undefined as boolean,
          mediafiles: [],
          result: 'Failed',
          timestamp: undefined as string,
        };
      });
  };

  public post = (tweet: Tweet, genre: string): Promise<WikiEditResult> => {
    const { title, body, pageTitle, date } = processTweetBody(tweet);
    const pageLongTitle = `公告/${pageTitle}`;
    const mediaFilePrefix = `公告-${genre}-${pageTitle}-`;
    const sameTitleAction = this.lock.lastActions.find((action) => action.title === pageLongTitle);
    if (sameTitleAction) return this.appendMedia(tweet, genre, sameTitleAction.mediafiles.length);
    return this.uploadMediaItems(tweet, mediaFilePrefix)
      .then((fileNames) => {
        // logger.info(`creating page ${pageLongTitle}`);
        return this.bot
          .edit({
            title: pageLongTitle,
            basetimestamp: new Date(),
            text: `{{文章戳
                    |文章上级页面=公告
                    |子类别=${genre}
                    |时间=${date}
                    |作者=IDOLY PRIDE
                    |是否原创=否
                    |来源=[https://twitter.com/idolypride IDOLY PRIDE]
                    |原文地址=[https://twitter.com/idolypride/status/${tweet.id_str} ${pageTitle}]
                    }}
                    ====${title.replace('\n', '<br />')}====
                    <poem>
                    ${body}
                    </poem>
                    ${fileNames.map((fileName) => `[[文件:${fileName}|无框|左]]`).join('\n')}
                    `,
            bot: true,
            notminor: true,
            createonly: true,
          })
          .then(({ new: isNewPost, newtimestamp, pageid, result, title }) => ({
            pageid,
            title,
            new: isNewPost,
            mediafiles: fileNames,
            result,
            timestamp: new Date(newtimestamp).toString(),
          }));
      })
      .catch((error) => {
        // logger.error(`error creating page, error: ${error}`);
        return {
          pageid: undefined as number,
          title: pageLongTitle,
          new: undefined as boolean,
          mediafiles: [],
          result: 'Failed',
          timestamp: undefined as string,
        };
      });
  };
}
