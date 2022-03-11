import xray from 'x-ray';
import cheerio from 'cheerio';
import fs from 'fs-extra';
// import Path from 'path';
import axios from 'axios';
import { skillNormal, skillYell, translateMapCn } from './skill';

// import { connect } from 'mongoose';

// import { MemberModel, MemberDetailModel, UnitModel, UnitDetailModel } from '../database/model';

// let unitList: unit[] = JSON.parse(fs.readFileSync(Path.resolve(__dirname, './unit-list.json'), 'utf-8'));
// let unitDetail: unitDetail[] = JSON.parse(fs.readFileSync(Path.resolve(__dirname, './unit-detail.json'), 'utf-8'));
// let memberList: member[] = JSON.parse(fs.readFileSync(Path.resolve(__dirname, './member-list.json'), 'utf-8'));
// let memberDetail: memberDetail[] = JSON.parse(fs.readFileSync(Path.resolve(__dirname, './member-detail.json'), 'utf-8'));

// async function run(): Promise<void> {
//   await connect('mongodb://121.196.97.42:27017/meidayo');
// }

let unitList: unit[] = [];
let unitDetail: unitDetail[] = [];
let memberList: member[] = [];
let memberDetail: memberDetail[] = [];

// run()
//   .then(async (res) => {
//     await init();
//   })
//   .catch((err) => console.log(err));

// const init = async () => {
//   memberList = await MemberModel.find({});
//   memberDetail = await MemberDetailModel.find({});
//   unitList = await UnitModel.find({});
//   unitDetail = await UnitDetailModel.find({});
// };

const x = xray().timeout(20000);

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
    let groupName = '';
    for (let index = 0; index < 2; index++) {
      $('table')
        .eq(index)
        .find('tr')
        .each((_ti, te) => {
          let a = $(te).find('a');
          if (a.length) {
            if (!/社長/.test(groupName)) {
              $(a).each((_i, e) => {
                let name = $(e).text();
                let url = $(e).attr('href');
                const id = +`1000${(member.length + 1 + '').padStart(2, '0')}`;
                member.push({
                  id,
                  name,
                  nikeName: '',
                  spell: '',
                  url,
                  groupName,
                });
              });
            }
          } else {
            groupName = $(te).find('th').text();
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
      let height = +$(table).find('tr:nth-child(1) > td:nth-child(2)').text().replace('cm', '');
      let weight = +$(table).find('tr:nth-child(1) > td:nth-child(4)').text().replace('kg', '');
      let bwh = $(table).find('tr:nth-child(2) > td:nth-child(2)').text();
      let birth = $(table)
        .find('tr:nth-child(2) > td:nth-child(4)')
        .text()
        .replace(/(.*)\(.*?\)/, '$1');
      let age = +$(table)
        .find('tr:nth-child(2) > td:nth-child(4)')
        .text()
        .replace(/(.*)\((\d+?)\D*?\)/, '$2');
      let favorite = $(table).find('tr:nth-child(3) > td:nth-child(2)').text().replace(/\n/g, '、');
      let school = $(table).find('tr:nth-child(3) > td:nth-child(4)').text();
      let voice = $(table).find('tr:nth-child(4) > td:nth-child(2)').text().replaceAll(/\n/g, '');
      let groupName = $(table).find('tr:nth-child(4) > td:nth-child(4)').text();

      let selfText = $('table + div')
        .eq(0)
        .text()
        .replace(/\n|公式サイト.*/g, '');

      resolve({
        id: member.id,
        name: member.name,
        age,
        height,
        weight,
        bwh,
        birth,
        favorite,
        school,
        voice,
        groupName,
        selfText,
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
const getUnitList = (memberList: member[]) => {
  return new Promise<unit[]>((resolve, reject) => {
    x(
      'https://appmedia.jp/idolypride/6574210',
      '.post-content@html'
    )((err, html) => {
      console.log('getUnitList', err || 'success');
      if (err || !html) {
        resolve([]);
        return;
      }
      const $ = cheerio.load(html);
      let unit: unit[] = [];
      $('#search_result_table tr[data-name]').each((index, element) => {
        const url = $(element).find('td:nth-child(1) a').attr('href') || null;
        const nameText = $(element).find('td:nth-child(1) .small').html();
        const title = nameText.split('<br>')[0];
        const name = nameText.split('<br>')[1];
        const icon = $(element).find('td:nth-child(1) img').attr('src');
        const prefab = icon.replace(/.*card-(.*?)-\d+-(.*)-(\d+).*/, '$1' + '-' + '$2' + '-' + '$3');
        const rarity = +$(element).find('td:nth-child(2)').text();
        const propensity = $(element).find('td:nth-child(3)').text();
        const type = $(element).find('td:nth-child(4)').text();
        const id = +`1${(index + 1 + '').padStart(3, '0')}01`;
        const res = memberList.find((e) => prefab.includes(e.spell));
        unit.push({
          id,
          memberId: res.id,
          url,
          title,
          name,
          prefab,
          rarity,
          propensity,
          type,
        });
      });
      resolve(unit);
    });
  });
};

// getUnitList();

/**
 * 获取卡牌信息
 */
const getUnitDetail = (unit: unit) => {
  return new Promise<unitDetail>((resolve, reject) => {
    // console.log(unit.url);
    if (!unit.url) {
      resolve({
        id: unit.id,
        spSkill: '',
        yellSkill: '',
        clothes: '',
        vocal: 0,
        dance: 0,
        visual: 0,
        stamina: 0,
        skill: [],
      });
      return;
    }
    x(
      unit.url,
      '.post-content@html'
    )((err, html) => {
      console.log('getUnitDetail', err || 'success');
      if (err || !html) {
        reject(null);
        return;
      }
      // fs.writeFileSync("./spider/text.txt", html);
      const $ = cheerio.load(html);
      // const prefab = $('img.aligncenter').attr('src');
      let table = $('table');
      const spSkill = $(table).eq(0).find('tr:nth-child(5) td').text() ?? '';
      const yellSkill = $(table).eq(0).find('tr:nth-child(6) td').text() ?? '';
      const clothes = $(table).eq(0).find('tr:nth-child(7) td').text() ?? '';
      const vocal = +$(table).eq(1).find('tr:nth-child(1) td:nth-child(2) span').text() ?? 0;
      const dance = +$(table).eq(1).find('tr:nth-child(2) td:nth-child(2) span').text() ?? 0;
      const visual = +$(table).eq(1).find('tr:nth-child(3) td:nth-child(2) span').text() ?? 0;
      const stamina = +$(table).eq(1).find('tr:nth-child(4) td:nth-child(2) span').text() ?? 0;
      let skill: skill[] = [];
      table = $('table.align_left');
      $(table).each((_index, element) => {
        let text = $(element).find('tr:nth-child(1)').text();
        let splitText = text.split(/^【(.*?)】(.*)/);
        let skillName = splitText[2] ?? splitText[0];
        let skillType = splitText[1] ?? 'Y';
        let skillText = $(element).find('tr:nth-child(2) td').html() || '';
        let skillIcon = handleSkill(skillType, skillText, unit);
        let skillBg = skillBgIcon(skillType, skillIcon);
        skill.push({
          skillName,
          skillType,
          skillText,
          skillIcon,
          skillBg,
        });
      });

      let data = {
        id: unit.id,
        spSkill,
        yellSkill,
        clothes,
        vocal,
        dance,
        visual,
        stamina,
        skill,
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
// let skill = JSON.parse(fs.readFileSync(Path.resolve(__dirname, './skill-list.json'), 'utf-8'));

const handleSkill = (skillType: string, skillText: string, unit: unit) => {
  let name = new Set<string>();
  let skillIcon = '';
  if (skillType == 'SP') {
    name.add(unit.prefab);
  } else if (skillType == 'Y') {
    let text = skillText.replace(/(\d+|\d+\.\d+)%?(上昇|UP)/, '');
    let tra = translateMapCn.get(text);
    let res = skillYell.filter((e) => e.includes(tra));
    name.add(res[res.length - 1]);
  } else {
    for (const item of skillText.split('<br>')) {
      if (/スタミナ:(\d+).*?(CT)?/.test(item)) {
        continue;
      }
      if (/のスコア獲得/.test(item)) {
        if (/のスコア獲得、(.*?)い程効果上昇/.test(item)) {
          let text = item.replace(/.*のスコア獲得、(.*?)が.*?い程効果上昇.*/, '$1');
          let tra = translateMapCn.get(text);
          let res = skillNormal.filter((e) => e.includes(tra) && e.includes('score-get'));
          name.add(res.length ? res[0] : 'score-get');
        } else {
          name.add('score-get');
        }
        continue;
      }
      if (/段階.*?(上昇|低下|增加|減少|UP|DOWN)効果/.test(item)) {
        let match = item.match(/段階(.*?)(上昇|低下|增加|減少|UP|DOWN)効果/g);
        match.forEach((item) => {
          let [, text, type] = item.split(/.*段階(.*?)(上昇|低下|增加|減少|UP|DOWN)効果.*/);
          let tra = translateMapCn.get(text);
          let res = skillNormal.filter((e) => {
            if (type == '上昇' || type == 'UP' || type == '增加') {
              return e.includes(tra) && (e.includes('up') || e.includes('increase'));
            } else {
              return e.includes(tra) && (e.includes('down') || e.includes('reduction'));
            }
          });
          name.add(res.length > 1 ? tra : res[res.length - 1]);
        });
        continue;
      }
      if (/段階の.*?効果/.test(item)) {
        let text = item.replace(/.*段階の(.*?)効果.*/, '$1');
        let tra = translateMapCn.get(text);
        name.add(tra);
        continue;
      }
      if (/スタミナを|のスタミナ回復効果/.test(item)) {
        let tra = translateMapCn.get(/スタミナを/.test(item) ? '回復' : 'スタミナ回復');
        name.add(tra);
        continue;
      }
      if (/強化効果を.*?(増強|延長)/.test(item)) {
        let tra = translateMapCn.get(/強化効果を.*?増強/.test(item) ? '強化効果増強' : '強化効果延長');
        name.add(tra);
        continue;
      }
      if (/強化効果を.*?前に/.test(item)) {
        let text = item.replace(/.*強化効果を(.*?)前に.*/, '$1');
        let tra = translateMapCn.get(text + '前に');
        name.add(tra);
        continue;
      }
      if (/コンボ継続効果/.test(item)) {
        let tra = translateMapCn.get('コンボ継続効果');
        name.add(tra);
        continue;
      }
      if (/低下効果(回復|防止|反転)/.test(item)) {
        let text = item.replace(/.*低下効果(回復|防止|反転).*/, '$1');
        let tra = translateMapCn.get('低下効果' + text);
        name.add(tra);
        continue;
      }
      if (/CTを.*?減少/.test(item)) {
        let tra = translateMapCn.get('CT');
        name.add(tra);
        continue;
      }
      if (/不調効果/.test(item)) {
        let tra = translateMapCn.get('不調');
        name.add(tra);
        continue;
      }
    }
  }
  let arr = [...name];
  if (arr.length > 1) {
    let index = arr.findIndex((e) => /down|consumption-increase|impossible/.test(e));
    if (index > -1 && index != 2) {
      // console.log(arr);
      if (arr[2]) {
        [arr[2], arr[index]] = [arr[index], arr[2]];
      } else {
        arr[2] = arr[index];
        arr[index] = '';
      }
    }

    index = arr.findIndex((e) => e.includes('score-get'));
    if (index > -1 && index != 1 && arr[1]) {
      // console.log(arr);
      [arr[1], arr[index]] = [arr[index], arr[1]];
    }

    if (arr[2] && !/down|consumption-increase|impossible/.test(arr[2])) {
      arr.splice(2, 1);
    }
  }

  skillIcon = arr.join(',');
  return skillIcon;
};

const skillBgIcon = (skillType: string, skillIcon: string) => {
  if (skillType === 'SP') {
    return 'special';
  } else if (skillType === 'Y') {
    return 'yell';
  } else {
    // score 蓝
    // support 绿
    // strength 天蓝
    let icons = skillIcon.split(',');
    if (icons.length === 1 && icons.includes('score-get')) {
      return 'score';
    }
    if (icons.some((e) => e.includes('up'))) {
      return 'strength';
    }
    return 'support';
  }
};
// handleSkill();

export { getMemberList, getMemberDetail, handleGetMemberDetail, getUnitList, getUnitDetail, handleGetUnitDetail };
