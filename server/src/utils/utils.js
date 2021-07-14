import axios from "axios";
import brotli from "brotli";
import fs from "fs-extra";
import Path from "path";
import db from "../database";

export const updateDatabase = async () => {
  const verPtah = Path.resolve(process.cwd(), "./database/version.txt");
  const version = fs.readFileSync(verPtah, "utf-8");
  console.log("检测数据库更新，本地版本：", version);
  let res = await axios.get("https://redive.estertion.win/last_version_jp.json");
  if (res.data.TruthVersion) {
    console.log("检测数据库更新，线上版本：", res.data.TruthVersion);
    if (res.data.TruthVersion !== version) {
      console.log("正在更新数据库...");
      db.close();
      const dbPath = Path.resolve(process.cwd(), "./database/redive_jp.db.br");
      const targetPath = Path.resolve(process.cwd(), "./database/redive_jp.db");
      let dbres = await getDBFile("https://redive.estertion.win/db/redive_jp.db.br", dbPath);
      if (dbres) {
        console.log("下载完成.");
        br2db(dbPath, targetPath);
        fs.writeFileSync(verPtah, res.data.TruthVersion);
        db.connect(targetPath);
        console.log("数据重新连接完成.");
      } else {
        console.log("更新失败.");
      }

    }
  }
};

export const getDBFile = (url, filePath) => {
  return new Promise((resolve, reject) => {
    axios({
      url,
      responseType: "stream"
    }).then((resp) => {
      const writer = fs.createWriteStream(filePath);
      resp.data.pipe(writer);
      writer.on("finish", () => {
        resolve(true);
      });
      writer.on("error", (err) => {
        console.log(err);
        reject(false);
      });
    }).catch(err=>{
      console.log(err);
      reject(false);
    });
  });
};

export const br2db = (source, target) => {
  fs.writeFileSync(target, brotli.decompress(fs.readFileSync(source)));
};
