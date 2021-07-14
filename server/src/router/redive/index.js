import mime from "mime";
import fs from "fs-extra";
import Path from "path";
import axios from "axios";
const router = require("koa-router")();

const rediveEstertionPath = "https://redive.estertion.win";

router.get("/estertion/:type1/:type2/:id", async (ctx) => {
  const requestPath = `${ctx.params.type1}/${ctx.params.type2}/${ctx.params.id}.webp`;
  const resPath = `${rediveEstertionPath}/${requestPath}`;
  await rediveEstertion(ctx, resPath, `./img/${requestPath}`);
});

const rediveEstertion = async (ctx, resPath, requestPath) => {
  const { request, response } = ctx;
  const filePath = Path.resolve(process.cwd(), requestPath);

  const exist = fs.existsSync(filePath);
  if (!exist) {
    await getEstertionImg(resPath, filePath);
  }

  const ifModifiedSince = request.headers["if-modified-since"];
  const imageStatus = await fs.stat(filePath);
  const lastModified = imageStatus.mtime.toGMTString();
  if (ifModifiedSince === lastModified) {
    response.status = 304;
  } else {
    response.lastModified = lastModified;
    // responseFile(filePath, ctx);
    const fileContent = fs.readFileSync(filePath);
    ctx.type = mime.getType(filePath);
    ctx.body = fileContent;
  }
};

const getEstertionImg = async (url, filePath) => {
  return new Promise((resolve, reject) => {
    axios({
      url,
      responseType: "stream",
    }).then((resp) => {
      const writer = fs.createWriteStream(filePath);
      resp.data.pipe(writer);
      writer.on("finish", () => {
        resolve();
      });
      writer.on("error", (err) => {
        reject(err);
      });
    });
  });
};

export default router;
