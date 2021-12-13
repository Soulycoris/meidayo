import fs from 'fs-extra';
import Path from 'path';
import axios from 'axios';
import koaRouter from 'koa-router';
import { ParameterizedContext } from 'koa';
const router = new koaRouter();

router.get('/estertion/:type1/:type2/:id', async (ctx) => {
  const requestPath = `${ctx.params.type1}/${ctx.params.type2}/${ctx.params.id}.webp`;
  const resPath = `/${requestPath}`;
  await rediveEstertion(ctx, resPath, `./img/${requestPath}`);
});

const rediveEstertion = async (ctx: ParameterizedContext, resPath: string, requestPath: string) => {
  const { request, response } = ctx;
  const filePath = Path.resolve(process.cwd(), requestPath);

  // const exist = fs.existsSync(filePath);
  // if (!exist) {
  //   await getEstertionImg(resPath, filePath);
  // }

  const ifModifiedSince = request.headers['if-modified-since'];
  const imageStatus = await fs.stat(filePath);
  const lastModified = imageStatus.mtime.toUTCString();
  if (ifModifiedSince === lastModified) {
    response.status = 304;
  } else {
    response.lastModified = new Date(lastModified);
    // responseFile(filePath, ctx);
    const fileContent = fs.readFileSync(filePath);
    // ctx.type = 'image/png; charset=UTF-8';
    ctx.body = fileContent;
  }
};

const getEstertionImg = async (url: string, filePath: fs.PathLike) => {
  return new Promise((resolve, reject) => {
    axios({
      url,
      responseType: 'stream',
    }).then((resp) => {
      const writer = fs.createWriteStream(filePath);
      resp.data.pipe(writer);
      writer.on('finish', () => {
        resolve(true);
      });
      writer.on('error', (err) => {
        reject(err);
      });
    });
  });
};

export default router;