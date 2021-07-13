import xray from "x-ray";
import cheerio from "cheerio";
import fs from "fs-extra";
import Path from "path";
import axios from "axios";
import unitList from "./unit-list.json";
import unitDetail from "./unit-detail.json";
console.log(unitList.length, unitDetail.length);
const x = xray();
const spiderBaseUrl = "https://appmedia.jp";

/**
 * 获取角色列表
 */
const getUnitList = () => {
  x(
    "https://appmedia.jp/idolypride/6574210",
    ".post-content@html"
  )((err, html) => {
    if (!html) {
      return;
    }
    const $ = cheerio.load(html);
    let unit = [];
    $("#search_result_table tr[data-name]").each((index, element) => {
      const url = $(element).find("td:nth-child(1) a").attr("href") || null;
      const nameText = $(element).find("td:nth-child(1)").text();
      const title = nameText.replace(/【(.*?)】(.*)/, "$1");
      const name = nameText.replace(/【(.*?)】(.*)/, "$2");
      const icon = $(element).find("td:nth-child(1) img").attr("src");
      const rarity = $(element).find("td:nth-child(2)").text();
      const propensity = $(element).find("td:nth-child(3)").text();
      const type = $(element).find("td:nth-child(4)").text();
      const id = `1${(index + 1 + "").padStart(3, "0")}01`;
      unit.push({
        id,
        url,
        title,
        name,
        icon,
        rarity,
        propensity,
        type,
      });
    });
    const filePath = Path.resolve(process.cwd(), `./spider/unit-list.json`);
    let str = JSON.stringify(unit, null, "\t");
    fs.writeFile(filePath, str, function (err) {
      if (err) {
        res.status(500).send("Server is error...");
      }
    });
  });
};

/**
 * 获取角色信息
 */
const getUnitDetail = (unit) => {
  return new Promise((resolve, reject) => {
    console.log(unit.url);
    if (!unit.url) {
      resolve({
        unit_id: unit.id,
        full: "",
        sp_skill: "",
        yell_skill: "",
        clothes: "",
        vo: "",
        da: "",
        vi: "",
        skill_1: "",
        skill_1_type: "",
        skill_1_text: "",
        skill_2: "",
        skill_2_type: "",
        skill_2_text: "",
        skill_3: "",
        skill_3_type: "",
        skill_3_text: "",
        skill_yell: "",
        skill_yell_text: "",
      });
      return;
    }
    x(
      unit.url,
      ".post-content@html"
    )((err, html) => {
      console.log(err);
      if (err || !html) {
        reject(null);
        return;
      }
      // fs.writeFileSync("./spider/text.txt", html);
      const $ = cheerio.load(html);
      const full = $("img.aligncenter").attr("src");
      const sp_skill = $("table").eq(0).find("tr:nth-child(5) td").text();
      const yell_skill = $("table").eq(0).find("tr:nth-child(6) td").text();
      const clothes = $("table").eq(0).find("tr:nth-child(7) td").text();
      const vo = $("table").eq(1).find("tr:nth-child(1) td:nth-child(2) span").text();
      const da = $("table").eq(1).find("tr:nth-child(2) td:nth-child(2) span").text();
      const vi = $("table").eq(1).find("tr:nth-child(3) td:nth-child(2) span").text();
      const skill_1 = $("table.align_left")
        .eq(0)
        .find("tr:nth-child(1)")
        .text()
        .replace(/【(.*?)】(.*)/, "$2");
      const skill_1_type = $("table.align_left")
        .eq(0)
        .find("tr:nth-child(1)")
        .text()
        .replace(/【(.*?)】(.*)/, "$1");
      const skill_1_text = $("table.align_left").eq(0).find("tr:nth-child(2) td").html();
      const skill_2 = $("table.align_left")
        .eq(1)
        .find("tr:nth-child(1)")
        .text()
        .replace(/【(.*?)】(.*)/, "$2");
      const skill_2_type = $("table.align_left")
        .eq(1)
        .find("tr:nth-child(1)")
        .text()
        .replace(/【(.*?)】(.*)/, "$1");
      const skill_2_text = $("table.align_left").eq(1).find("tr:nth-child(2) td").html();
      const skill_3 = $("table.align_left")
        .eq(2)
        .find("tr:nth-child(1)")
        .text()
        .replace(/【(.*?)】(.*)/, "$2");
      const skill_3_type = $("table.align_left")
        .eq(2)
        .find("tr:nth-child(1)")
        .text()
        .replace(/【(.*?)】(.*)/, "$1");
      const skill_3_text = $("table.align_left").eq(2).find("tr:nth-child(2) td").html();
      const skill_yell = $("table.align_left").eq(3).find("tr:nth-child(1)").text();
      const skill_yell_text = $("table.align_left").eq(3).find("tr:nth-child(2) td").html();
      let data = {
        unit_id: unit.id,
        full,
        sp_skill,
        yell_skill,
        clothes,
        vo,
        da,
        vi,
        skill_1,
        skill_1_type,
        skill_1_text,
        skill_2,
        skill_2_type,
        skill_2_text,
        skill_3,
        skill_3_type,
        skill_3_text,
        skill_yell,
        skill_yell_text,
      };
      resolve(data);
    });
  });
};

const handleGetUnitDetail = async () => {
  for (let index = unitDetail.length; index < unitList.length; index++) {
    const element = unitList[index];
    let data = await getUnitDetail(element);
    if (data) {
      unitDetail.push(data);
      let str = JSON.stringify(unitDetail, null, "\t");
      fs.writeFileSync("./spider/unit-detail.json", str);
    } else {
      return;
    }
  }
};

// handleGetUnitDetail();

const getEstertionImg = async (url, filePath) => {
  return new Promise((resolve, reject) => {
    axios({
      url,
      responseType: "stream",
    }).then((res) => {
      const writer = fs.createWriteStream(filePath);
      res.data.pipe(writer);
      writer.on("finish", () => {
        resolve("success");
      });
      writer.on("error", (err) => {
        reject(err);
      });
    });
  });
};

/**
 * 获取角色头像
 */
const getIcon = async () => {
  unitList.forEach(async (e) => {
    const filePath = Path.resolve(process.cwd(), `./img/icon/unit/${e.id}.jpg`);
    const resPath = `${spiderBaseUrl}${e.icon}`;
    console.log(resPath);
    let data = await getEstertionImg(resPath, filePath);
    console.log(data);
  });
};

/**
 * 获取角色立绘
 */
const getImgFull = () => {
  unitDetail.forEach(async (e) => {
    const filePath = Path.resolve(process.cwd(), `./img/card/full/${e.unit_id}.jpg`);
    const resPath = e.full;
    console.log(resPath);
    if (resPath) {
      let data = await getEstertionImg(resPath, filePath);
      console.log(data);
    }
  });
};

// getImgFull()
