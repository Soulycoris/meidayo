// 数据查询

const DBHelper = {
  /**
   * 获取角色列表
   */
  queryMemberList: ``,
  queryUnitList: `SELECT
    id,
    member_id,
    name,
    title,
    prefab,
    rarity,
    propensity,
    type
  FROM unitList;
  ;`,
  queryUnitDetail: `SELECT 
    ul.id,
    ul.member_id,
    ul.name,
    ul.title,
    ul.prefab,
    ul.rarity,
    ul.propensity,
    ul.type,
    ud.sp_skill,
    ud.yell_skill,
    ud.clothes,
    ud.vocal,
    ud.dance,
    ud.visual,
    ud.stamina
  FROM unitList AS ul
  LEFT JOIN unitDetail AS ud ON ud.id = ul.id
  WHERE ul.id = $id
  ;`,
  queryUnitDetailAll: `SELECT
  * 
  FROM unitList
  inner join unitDetail
  ON unitList.id=unitDetail.id
  GROUP BY unitList.id
  ;`,
  querySkillList: `SELECT
    sl.skill_name,
    sl.skill_type,
    sl.skill_text,
    sl.skill_icon
  FROM skillList AS sl
  WHERE sl.id = $id
  ;`,
  insertMemberList: `INSERT INTO memberList (
    id,
    name,
    nike_name,
    spell,
    url,
    icon,
    group_name )
    VALUES ( ?, ?, ?, ?, ?, ?, ? );`,
  insertMemberDetail: `INSERT INTO memberDetail (
      member_id,
      name,
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
      clothes,
      prefab
  )
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);`,
  insertUnitList: `INSERT INTO unitList (
      id,
      member_id,
      url,
      title,
      name,
      prefab,
      rarity,
      propensity,
      type
    )
    VALUES (?,?,?,?,?,?,?,?,?);`,
  insertUnitDetail: `INSERT INTO unitDetail (
    name,
    id,
    member_id,
    title,
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
    skill_yell_text
  )
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`,
  insertSkillList: `INSERT INTO skillList (
    id,
    skill_name,
    skill_type,
    skill_text,
    skill_icon
  )
  VALUES (?,?,?,?,?);
  `,
  createMemberList: `CREATE TABLE memberList (
    id         INTEGER PRIMARY KEY,
    name       TEXT,
    nike_name  TEXT,
    spell      TEXT,
    url        TEXT,
    icon       TEXT,
    group_name TEXT )`,
  createMemberDetail: `CREATE TABLE memberDetail (
    member_id INTEGER,
    name TEXT,
    age INTEGER,
    height INTEGER,
    weight INTEGER,
    bwh TEXT,
    birth TEXT,
    favorite TEXT,
    school TEXT,
    voice TEXT,
    group_name TEXT,
    self_text TEXT,
    clothes TEXT,
    prefab TEXT )`,
  createUnitList: `CREATE TABLE unitList (
    id         INTEGER PRIMARY KEY,
    member_id  INTEGER,
    name       TEXT,
    title      TEXT,
    url        TEXT,
    prefab     TEXT,
    rarity     INTEGER,
    propensity TEXT,
    type       TEXT )`,
  createUnitDetail: `CREATE TABLE unitDetail (
    id              INTEGER REFERENCES unitList (id),
    member_id       INTEGER,
    name            TEXT,
    title           TEXT,
    sp_skill        TEXT,
    yell_skill      TEXT,
    clothes         TEXT,
    vocal           INTEGER,
    dance           INTEGER,
    visual          INTEGER,
    stamina         INTEGER,
    skill_1         TEXT,
    skill_1_type    TEXT,
    skill_1_text    TEXT,
    skill_2         TEXT,
    skill_2_type    TEXT,
    skill_2_text    TEXT,
    skill_3         TEXT,
    skill_3_type    TEXT,
    skill_3_text    TEXT,
    skill_yell      TEXT,
    skill_yell_text TEXT )`,
};
export default DBHelper;
