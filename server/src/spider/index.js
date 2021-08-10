import xray from "x-ray";
import cheerio from "cheerio";
import fs from "fs-extra";
import Path from "path";
import axios from "axios";
import unitList from "./unit-list.json";
import unitDetail from "./unit-detail.json";
import memberList from "./member-list.json";
import memberDetail from "./member-detail.json";

const x = xray();
const spiderBaseUrl = "https://appmedia.jp";
if (!unitList) {
  unitList = [];
}
if (!unitDetail) {
  unitDetail = [];
}
if (!memberList) {
  memberList = [];
}
if (!memberDetail) {
  memberDetail = [];
}
// console.log(unitList.length);

/**
 * 获取角色列表
 */
const getMemberList = () => {
  x(
    "https://appmedia.jp/idolypride/6389167",
    ".post-content@html"
  )((err, html) => {
    if (!html) {
      return;
    }
    // fs.writeFileSync("./spider/test.txt", html);
    const $ = cheerio.load(html);
    let member = [];
    let group = "";
    for (let index = 0; index < 2; index++) {
      $("table")
        .eq(index)
        .find("tr")
        .each((ti, te) => {
          let a = $(te).find("a");
          if (a.length) {
            if (!/社長/.test(group)) {
              $(a).each((i, e) => {
                let name = $(e).text();
                let url = $(e).attr("href");
                let icon = $(e).find("img").attr("src");
                const id = `1000${(member.length + 1 + "").padStart(2, "0")}`;
                member.push({
                  id,
                  name,
                  url,
                  icon,
                  group,
                });
              });
            }
          } else {
            group = $(te).find("th").text();
          }
        });
    }
    // console.log(member);
    let str = JSON.stringify(member, null, "\t");
    fs.writeFileSync("./src/spider/member-list.json", str);
  });
};
// getMemberList()

const getMemberDetail = (unit) => {
  return new Promise((resolve, reject) => {
    x(
      unit.url,
      ".post-content@html"
    )((err, html) => {
      console.log(err);
      if (err || !html) {
        reject(null);
        return;
      }
      // fs.writeFileSync("./spider/test.txt", html);

      const $ = cheerio.load(html);
      let prefab = $("img.size-full").eq(0).attr("src");
      let table = $("table").eq(0);
      let height = $(table).find("tr:nth-child(1) > td:nth-child(2)").text();
      let weight = $(table).find("tr:nth-child(1) > td:nth-child(4)").text();
      let bwh = $(table).find("tr:nth-child(2) > td:nth-child(2)").text();
      let birth = $(table)
        .find("tr:nth-child(2) > td:nth-child(4)")
        .text()
        .replace(/(.*)\(.*?\)/, "$1");
      let age = $(table)
        .find("tr:nth-child(2) > td:nth-child(4)")
        .text()
        .replace(/(.*)\((\d+?)\D*?\)/, "$2");
      let favorite = $(table).find("tr:nth-child(3) > td:nth-child(2)").text().replace(/\n/g, "、");
      let school = $(table).find("tr:nth-child(3) > td:nth-child(4)").text();
      let voice = $(table).find("tr:nth-child(4) > td:nth-child(2)").text();
      let group = $(table).find("tr:nth-child(4) > td:nth-child(4)").text();

      let self_text = $("table + div")
        .eq(0)
        .text()
        .replace(/\n|公式サイト.*/g, "");
      let clothes = $("p > img").eq(1).attr("src");
      // let music = [];
      // $("table")
      //   .eq(1)
      //   .find("tr")
      //   .each((index, element) => {
      //     let img = $(element).find("img");
      //     if (img.length) {
      //       let cover = $(img).attr("src");
      //       let title = $(element).find("td:nth-child(1)").text();
      //       let singer = $(element).find("td:nth-child(2)").text();
      //       music.push({
      //         cover,
      //         title,
      //         singer,
      //       });
      //     }
      //   });
      // console.log(music);
      resolve({
        member_id: unit.id,
        name: unit.name,
        age,
        height,
        weight,
        bwh,
        birth,
        favorite,
        school,
        voice,
        group,
        self_text,
        clothes,
        prefab,
      });
      // console.log(member);
    });
  });
};
const handleGetMemberDetail = async () => {
  for (let index = memberDetail.length; index < memberList.length; index++) {
    const element = memberList[index];
    let data = await getMemberDetail(element);
    if (data) {
      memberDetail.push(data);
      let str = JSON.stringify(memberDetail, null, "\t");
      fs.writeFileSync("./src/spider//member-detail.json", str);
    } else {
      return;
    }
  }
};

// handleGetMemberDetail()
/**
 * 获取卡牌列表
 */
const getUnitList = () => {
  x(
    "https://appmedia.jp/idolypride/6574210",
    ".post-content@html"
  )((err, html) => {
    console.log(err);
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
      const res = memberList.find((e) => name.includes(e.nike_name));
      console.log(name);
      unit.push({
        id,
        member_id: res.id,
        url,
        title,
        name,
        icon,
        rarity,
        propensity,
        type,
      });
    });
    let str = JSON.stringify(unit, null, "\t");
    fs.writeFileSync("./src/spider/unit-list.json", str);
  });
};
// getUnitList();
/**
 * 获取卡牌信息
 */
const getUnitDetail = (unit) => {
  return new Promise((resolve, reject) => {
    console.log(unit.url);
    if (!unit.url) {
      resolve({
        unit_id: unit.id,
        member_id: unit.member_id,
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
      let table = $("table");
      const sp_skill = $(table).eq(0).find("tr:nth-child(5) td").text();
      const yell_skill = $(table).eq(0).find("tr:nth-child(6) td").text();
      const clothes = $(table).eq(0).find("tr:nth-child(7) td").text();
      const vo = $(table).eq(1).find("tr:nth-child(1) td:nth-child(2) span").text();
      const da = $(table).eq(1).find("tr:nth-child(2) td:nth-child(2) span").text();
      const vi = $(table).eq(1).find("tr:nth-child(3) td:nth-child(2) span").text();
      table = $("table.align_left");
      const skill_1 = $(table)
        .eq(0)
        .find("tr:nth-child(1)")
        .text()
        .replace(/【(.*?)】(.*)/, "$2");
      const skill_1_type = $(table)
        .eq(0)
        .find("tr:nth-child(1)")
        .text()
        .replace(/【(.*?)】(.*)/, "$1");
      const skill_1_text = $(table).eq(0).find("tr:nth-child(2) td").html();
      const skill_2 = $(table)
        .eq(1)
        .find("tr:nth-child(1)")
        .text()
        .replace(/【(.*?)】(.*)/, "$2");
      const skill_2_type = $(table)
        .eq(1)
        .find("tr:nth-child(1)")
        .text()
        .replace(/【(.*?)】(.*)/, "$1");
      const skill_2_text = $(table).eq(1).find("tr:nth-child(2) td").html();
      const skill_3 = $(table)
        .eq(2)
        .find("tr:nth-child(1)")
        .text()
        .replace(/【(.*?)】(.*)/, "$2");
      const skill_3_type = $(table)
        .eq(2)
        .find("tr:nth-child(1)")
        .text()
        .replace(/【(.*?)】(.*)/, "$1");
      const skill_3_text = $(table).eq(2).find("tr:nth-child(2) td").html();
      const skill_yell = $(table).eq(3).find("tr:nth-child(1)").text();
      const skill_yell_text = $(table).eq(3).find("tr:nth-child(2) td").html();
      let data = {
        unit_id: unit.id,
        member_id: unit.member_id,
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
      fs.writeFileSync("./src/spider/unit-detail.json", str);
    } else {
      return;
    }
  }
};

// handleGetUnitDetail();

const getEstertionImg = async (url, filePath) => {
  const exist = fs.existsSync(filePath);
  if (exist) {
    const imageStatus = await fs.stat(filePath);
    if (imageStatus.size) {
      return "exist";
    }
  }
  return new Promise((resolve, reject) => {
    axios({
      url,
      responseType: "stream",
    })
      .then((res) => {
        const writer = fs.createWriteStream(filePath);
        res.data.pipe(writer);
        writer.on("finish", () => {
          resolve("success");
        });
        writer.on("error", (err) => {
          reject(err);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * 获取卡牌头像
 */
const getIcon = async () => {
  for (const element of unitList) {
    const filePath = Path.resolve(process.cwd(), `./img/icon/unit/${element.id}.jpg`);
    const resPath = `${element.icon}`;
    console.log(resPath);
    let data = await getEstertionImg(resPath, filePath);
    console.log(data);
  }
};

// getIcon()

/**
 * 获取卡牌立绘
 */
const getImgFull = async () => {
  for (const element of unitDetail) {
    const filePath = Path.resolve(process.cwd(), `./img/card/full/${element.unit_id}.jpg`);
    const resPath = element.full;
    console.log(resPath);
    if (resPath) {
      let data = await getEstertionImg(resPath, filePath);
      console.log(data);
    }
  }
};

// getImgFull()

/**
 * 获取角色头像
 */
const getMemberIcon = async () => {
  for (const element of memberList) {
    const filePath = Path.resolve(process.cwd(), `./img/icon/member/${e.id}.jpg`);
    const resPath = element.icon;
    console.log(resPath);
    if (resPath) {
      let data = await getEstertionImg(resPath, filePath);
      console.log(data);
    }
  }
};

// getMemberIcon()
/**
 * 获取角色立绘和服装
 */
const getMemberClothesOrPrefab = async () => {
  for (const element of memberDetail) {
    const clothesPath = Path.resolve(process.cwd(), `./img/member/clothes/${element.member_id}.jpg`);
    const prefabPath = Path.resolve(process.cwd(), `./img/member/prefab/${element.member_id}.jpg`);
    const clothesRes = element.clothes;
    const prefabRes = element.prefab;
    // console.log(clothesRes);
    // console.log(prefabRes);
    if (clothesRes) {
      let clothes = await getEstertionImg(clothesRes, clothesPath);
      let prefab = await getEstertionImg(prefabRes, prefabPath);
      console.log(clothes, prefab);
    }
  }
};

// getMemberClothesOrPrefab();

// const html = fs.readFileSync("./spider/test.txt", "utf-8");
// const $ = cheerio.load(html);

// let str = JSON.stringify(member, null, "\t");
// fs.writeFileSync("./spider/member-list.json", str);

unitDetail.forEach((element) => {
  memberList.forEach((e) => {
    if (element.member_id === e.id) {
      element.name = e.name;
    }
  });
});

let str = JSON.stringify(unitDetail, null, "\t");
fs.writeFileSync("./src/spider/unit-detail.json", str);