import fs from 'fs-extra';
import Wiki from './wiki';

import { CardDetail } from '@/ProtoTypes';
import { composeCardPage } from './card';

const baseUrl = 'https://wiki.biligame.com/idolypride';

const { readdir } = fs.promises;

interface WorkerOption {
  wikiSessionCookie: string;
}

export default class {
  private publisher: Wiki;
  private wikiSessionCookie: string;

  constructor(opt: WorkerOption) {
    this.publisher = new Wiki();
    this.wikiSessionCookie = opt.wikiSessionCookie;
  }

  public launch = async () => {
    await this.publisher.login(this.wikiSessionCookie);
  };

  public uploadAssets = async () => {
    const files = await readdir('./assets/upload');
    for (const file of files) {
      await this.publisher.uploadMediaItems(`./assets/upload/${file}`, file);
    }
  };

  public postCard = async (cardDetail: CardDetail) => {
    const { charName, charId, text } = composeCardPage(cardDetail);
    const title = `${charName}/卡牌/${charId}`;
    // await this.publisher.post(title, text);
    // return `${baseUrl}/${charName}/卡牌/${charId}`;
    const token = this.publisher.getToken();
    console.log(token);
    return token;
  };
}
