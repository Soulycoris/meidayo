import xray from 'x-ray';
import cheerio from 'cheerio';
import fs from 'fs-extra';
import Path from 'path';
import axios from 'axios';
let unitList: unit[] = JSON.parse(fs.readFileSync(Path.resolve(__dirname, './unit-list.json'), 'utf-8'));
let unitDetail: unitDetail[] = JSON.parse(fs.readFileSync(Path.resolve(__dirname, './unit-detail.json'), 'utf-8'));
let memberList: member[] = JSON.parse(fs.readFileSync(Path.resolve(__dirname, './member-list.json'), 'utf-8'));
let memberDetail: memberDetail[] = JSON.parse(fs.readFileSync(Path.resolve(__dirname, './member-detail.json'), 'utf-8'));

const x = xray();

/**
 * 获取角色列表
 */
const getMemberList = () => {
  x(
    'https://appmedia.jp/idolypride/6389167',
    '.post-content@html'
  )((_err, html) => {
    if (!html) {
      return;
    }
    // fs.writeFileSync("./spider/test.txt", html);
    const $ = cheerio.load(html);
    let member: member[] = [];
    let group_name = '';
    for (let index = 0; index < 2; index++) {
      $('table')
        .eq(index)
        .find('tr')
        .each((_ti, te) => {
          let a = $(te).find('a');
          if (a.length) {
            if (!/社長/.test(group_name)) {
              $(a).each((_i, e) => {
                let name = $(e).text();
                let url = $(e).attr('href');
                const id = `1000${(member.length + 1 + '').padStart(2, '0')}`;
                member.push({
                  id,
                  name,
                  nike_name: '',
                  spell: '',
                  url,
                  group_name,
                });
              });
            }
          } else {
            group_name = $(te).find('th').text();
          }
        });
    }
    // console.log(member);
    let str = JSON.stringify(member, null, '\t');
    fs.writeFileSync('./src/spider/member-list.json', str);
  });
};
// getMemberList()

const getMemberDetail = (member: member) => {
  return new Promise((resolve: (value: memberDetail) => void, reject: (value: null) => void) => {
    x(
      member.url,
      '.post-content@html'
    )((err, html) => {
      console.log(err);
      if (err || !html) {
        reject(null);
        return;
      }
      // fs.writeFileSync("./spider/test.txt", html);

      const $ = cheerio.load(html);
      let table = $('table').eq(0);
      let height = $(table).find('tr:nth-child(1) > td:nth-child(2)').text().replace('cm', '');
      let weight = $(table).find('tr:nth-child(1) > td:nth-child(4)').text().replace('kg', '');
      let bwh = $(table).find('tr:nth-child(2) > td:nth-child(2)').text();
      let birth = $(table)
        .find('tr:nth-child(2) > td:nth-child(4)')
        .text()
        .replace(/(.*)\(.*?\)/, '$1');
      let age = $(table)
        .find('tr:nth-child(2) > td:nth-child(4)')
        .text()
        .replace(/(.*)\((\d+?)\D*?\)/, '$2');
      let favorite = $(table).find('tr:nth-child(3) > td:nth-child(2)').text().replace(/\n/g, '、');
      let school = $(table).find('tr:nth-child(3) > td:nth-child(4)').text();
      let voice = $(table).find('tr:nth-child(4) > td:nth-child(2)').text();
      let group_name = $(table).find('tr:nth-child(4) > td:nth-child(4)').text();

      let self_text = $('table + div')
        .eq(0)
        .text()
        .replace(/\n|公式サイト.*/g, '');

      resolve({
        member_id: member.id,
        name: member.name,
        age,
        height,
        weight,
        bwh,
        birth,
        favorite,
        school,
        voice,
        group_name,
        self_text,
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
      let str = JSON.stringify(memberDetail, null, '\t');
      fs.writeFileSync('./src/spider//member-detail.json', str);
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
    'https://appmedia.jp/idolypride/6574210',
    '.post-content@html'
  )((err, html) => {
    console.log(err || 'success');
    if (!html) {
      return null;
    }
    const $ = cheerio.load(html);
    let unit: unit[] = [];
    $('#search_result_table tr[data-name]').each((index, element) => {
      const url = $(element).find('td:nth-child(1) a').attr('href') || null;
      const nameText = $(element).find('td:nth-child(1)').text();
      const title = nameText.replace(/【(.*?)】(.*)/, '$1');
      const name = nameText.replace(/【(.*?)】(.*)/, '$2');
      const icon = $(element).find('td:nth-child(1) img').attr('src');
      const prefab = icon.replace(/.*card-(.*?)-\d+-(.*)-(\d+).*/, '$1' + '-' + '$2' + '-' + '$3');
      const rarity = $(element).find('td:nth-child(2)').text();
      const propensity = $(element).find('td:nth-child(3)').text();
      const type = $(element).find('td:nth-child(4)').text();
      const id = `1${(index + 1 + '').padStart(3, '0')}01`;
      const res = memberList.find((e) => name.includes(e.nike_name) || name === e.name);
      // console.log(name);
      unit.push({
        id,
        member_id: res.id,
        url,
        title,
        name,
        prefab,
        rarity,
        propensity,
        type,
      });
    });
    console.log(unitList.length, unit.length);

    if (unitList.length !== unit.length) {
      unitList.push(...unit.splice(unitList.length));
    }
    let str = JSON.stringify(unitList, null, '\t');
    fs.writeFileSync('./src/spider/unit-list.json', str);
  });
};

// getUnitList();

/**
 * 获取卡牌信息
 */
const getUnitDetail = (unit: unit) => {
  return new Promise<unitDetail>((resolve, reject) => {
    console.log(unit.url);
    if (!unit.url) {
      resolve({
        name: unit.name,
        unit_id: unit.id,
        member_id: unit.member_id,
        title: unit.title,
        sp_skill: '',
        yell_skill: '',
        clothes: '',
        vocal: '',
        dance: '',
        visual: '',
        stamina: '',
        skill_1: '',
        skill_1_type: '',
        skill_1_text: '',
        skill_2: '',
        skill_2_type: '',
        skill_2_text: '',
        skill_3: '',
        skill_3_type: '',
        skill_3_text: '',
        skill_yell: '',
        skill_yell_text: '',
      });
      return;
    }
    x(
      unit.url,
      '.post-content@html'
    )((err, html) => {
      console.log(err || 'success');
      if (err || !html) {
        reject(null);
        return;
      }
      // fs.writeFileSync("./spider/text.txt", html);
      const $ = cheerio.load(html);
      const prefab = $('img.aligncenter').attr('src');
      let table = $('table');
      const sp_skill = $(table).eq(0).find('tr:nth-child(5) td').text();
      const yell_skill = $(table).eq(0).find('tr:nth-child(6) td').text();
      const clothes = $(table).eq(0).find('tr:nth-child(7) td').text();
      const vocal = $(table).eq(1).find('tr:nth-child(1) td:nth-child(2) span').text();
      const dance = $(table).eq(1).find('tr:nth-child(2) td:nth-child(2) span').text();
      const visual = $(table).eq(1).find('tr:nth-child(3) td:nth-child(2) span').text();
      const stamina = $(table).eq(1).find('tr:nth-child(4) td:nth-child(2) span').text();
      table = $('table.align_left');
      const skill_1 =
        $(table)
          .eq(0)
          .find('tr:nth-child(1)')
          .text()
          .replace(/【(.*?)】(.*)/, '$2') || '';
      const skill_1_type = $(table)
        .eq(0)
        .find('tr:nth-child(1)')
        .text()
        .replace(/【(.*?)】(.*)/, '$1');
      const skill_1_text = $(table).eq(0).find('tr:nth-child(2) td').html() || '';
      const skill_2 =
        $(table)
          .eq(1)
          .find('tr:nth-child(1)')
          .text()
          .replace(/【(.*?)】(.*)/, '$2') || '';
      const skill_2_type = $(table)
        .eq(1)
        .find('tr:nth-child(1)')
        .text()
        .replace(/【(.*?)】(.*)/, '$1');
      const skill_2_text = $(table).eq(1).find('tr:nth-child(2) td').html() || '';
      const skill_3 =
        $(table)
          .eq(2)
          .find('tr:nth-child(1)')
          .text()
          .replace(/【(.*?)】(.*)/, '$2') || '';
      const skill_3_type =
        $(table)
          .eq(2)
          .find('tr:nth-child(1)')
          .text()
          .replace(/【(.*?)】(.*)/, '$1') || '';
      const skill_3_text = $(table).eq(2).find('tr:nth-child(2) td').html() || '';
      const skill_yell = $(table).eq(3).find('tr:nth-child(1)').text() || '';
      const skill_yell_text = $(table).eq(3).find('tr:nth-child(2) td').html() || '';
      let data = {
        name: unit.name,
        unit_id: unit.id,
        member_id: unit.member_id,
        title: unit.title,
        prefab,
        sp_skill,
        yell_skill,
        clothes,
        vocal,
        dance,
        visual,
        stamina,
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
      let str = JSON.stringify(unitDetail, null, '\t');
      fs.writeFileSync('./src/spider/unit-detail.json', str);
    } else {
      return;
    }
  }
};

// handleGetUnitDetail();

const getEstertionImg = async (url: string, filePath: fs.PathLike) => {
  const exist = fs.existsSync(filePath);
  if (exist) {
    const imageStatus = await fs.stat(filePath);
    if (imageStatus.size) {
      return 'exist';
    }
  }
  return new Promise((resolve, reject) => {
    axios({
      url,
      responseType: 'stream',
    })
      .then((res) => {
        const writer = fs.createWriteStream(filePath);
        res.data.pipe(writer);
        writer.on('finish', () => {
          resolve('success');
        });
        writer.on('error', (err) => {
          reject(err);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export { getMemberList, getMemberDetail, handleGetMemberDetail, getUnitList, getUnitDetail, handleGetUnitDetail };
