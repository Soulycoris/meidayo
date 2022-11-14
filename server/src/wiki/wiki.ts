import fetchCookie from 'fetch-cookie';
import { MWBot, WikiError } from 'mediawiki2';
import nodeFetch from 'node-fetch';
import { firefox } from 'playwright';
import { CookieJar, MemoryCookieStore } from 'tough-cookie';
import consola from 'consola';

const baseUrl = 'https://wiki.biligame.com/idolypride';

export default class {
  private bot: MWBot;

  constructor() {
    this.bot = new MWBot(`${baseUrl}/api.php`);
  }

  public login = async (sessdata: string) => {
    // const jar = (this.bot as any).cookieJar as CookieJar;
    const store = new MemoryCookieStore();
    const jar = new CookieJar(store, {
      looseMode: false,
    });
    const browser = await firefox.launch();
    const page = await browser.newPage();
    try {
      await page.context().addCookies([
        {
          name: 'SESSDATA',
          value: sessdata,
          domain: '.biligame.com',
          path: '/',
        },
      ]);
      await page.route('**/*.{png,jpg,jpeg,gif}', (route) => route.abort());
      await page.route('*://*.baidu.com/**', (route) => route.abort());
      await page.goto(`${baseUrl}/index.php?curid=2`, { waitUntil: 'networkidle' });
      consola.info('logging in via browser...');

      const cookies = await page.context().cookies();
      const uidIndex = cookies.findIndex((cookie) => cookie.name === 'gamecenter_wiki_UserName');
      if (!uidIndex) throw new Error('auth error');
      let setCookie = cookies.map(({ name, value, domain, path }) => jar.setCookie(`${name}=${value}; Domain=${domain}; Path=${path}`, baseUrl));
      await Promise.all(setCookie);
      const uid = cookies[uidIndex].value;
      consola.info(`finished logging in via browser, wiki username: ${uid}`);
      this.bot.fetch = (fetchCookie as any)(nodeFetch, jar);
      return await browser.close();
    } catch (err) {
      await browser.close();
      consola.fatal(`error logging in via browser, error: ${err}`);
      process.exit(0);
    }
  };

  public uploadMediaItems = async (file: any, filename: string) => {
    await this.bot
      .simpleUpload({
        file,
        filename,
      })
      .then(() => filename)
      .catch((error) => {
        if (error instanceof WikiError && error.data.result === 'Warning') {
          const { duplicate } = error.data.warnings;
          if (duplicate) return duplicate[0];
        } else throw error;
      });
  };

  public post = async (title: string, text: string): Promise<WikiEditResult> => {
    return this.bot
      .edit({
        title,
        text,
        bot: true,
        notminor: true,
        createonly: false, // 不要编辑页面，如果已经存在。
        nocreate: false, // 如果该页面不存在，则抛出一个错误。
      })
      .catch((error) => {
        if (error instanceof WikiError && error.data.result === 'Warning') {
          const { duplicate } = error.data.warnings;
          if (duplicate) return duplicate[0];
        } else throw error;
      });
  };
}
