const router = require("koa-router")();
import db from "../../database";
import DBHelper from "../../database/DBHelper";
/**
 * equipment_data           装备数据
 * skill_data               技能数据
 * unit_data                单位数据
 * unit_profile             单位概述
 * unit_promotion           单位rank装备
 * unit_promotion_status    单位rank数据
 * unit_rarity              单位星级数据
 * unit_skill_data          单位技能数据
 * actual_unit_background   现实人物数据
 */
router.get("/list", async (ctx) => {
  const data = await db.queryData(DBHelper.getCharaList, {});
  ctx.body = data;
});

router.get("/base/:unit_id", async (ctx) => {
  const charaBase = await db.queryData(DBHelper.getCharaBaseById, {
    $unit_id: ctx.params.unit_id,
  });

  const unitRarity = await db.queryData(DBHelper.getUnitRarity, {
    $unit_id: ctx.params.unit_id,
  });

  const charaPromotion = await db.queryData(DBHelper.getCharaPromotion, {
    $unit_id: ctx.params.unit_id,
  });

  let slots = [];
  for (const key in charaPromotion[0]) {
    if (charaPromotion[0].hasOwnProperty(key)) {
      if (/equip_slot_/.test(key) && charaPromotion[0][key] !== 999999) {
        slots.push(charaPromotion[0][key]);
      }
    }
  }
  const charaPromotionStatus = await db.queryData(DBHelper.getCharaPromotionStatus, {
    $unit_id: ctx.params.unit_id,
  });

  const equipments = await db.queryData(`${DBHelper.getEquipments} ( ${slots.map(() => "?").join(",")} )`, slots);

  // slots.splice(0,slots.length);
  // for (const item of charaPromotion) {
  //   for (const key in item) {
  //     if (item.hasOwnProperty(key)) {
  //       if (/equip_slot_/.test(key) && item[key] !== 999999) {
  //         slots.push(item[key]);
  //       }
  //     }
  //   }
  // }
  // const equipmentsPromotion = await db.queryData(
  //   `${DBHelper.getEquipments} ( ${slots.map(() => '?').join(',')} )`,
  //   slots
  // );

  const uniqueEquipment = await db.queryData(DBHelper.getUniqueEquipment, {
    $unit_id: ctx.params.unit_id,
  });

  const uniqueEquipmentEnhance = await db.queryData(DBHelper.getUniqueEquipmentEnhance, {
    $unit_id: ctx.params.unit_id,
  });

  const unitSkillData = await db.queryData(DBHelper.getUnitSkillData, {
    $unit_id: ctx.params.unit_id,
  });

  let skillArr = [];

  unitSkillData.forEach((element) => {
    for (const key in element) {
      if (/(skill_|union_)/.test(key) && element[key]) {
        skillArr.push(element[key]);
      }
    }
  });

  const skillData = await db.queryData(`${DBHelper.getSkillData} ( ${skillArr.map(() => "?").join(",")} )`, skillArr);

  let actionArr = [];

  skillData.forEach((element) => {
    for (const key in element) {
      if (/(action_)/.test(key) && element[key]) {
        actionArr.push(element[key]);
      }
    }
  });

  const skillAction = await db.queryData(`${DBHelper.getSkillAction} ( ${actionArr.map(() => "?").join(",")} )`, actionArr);

  const unitAttackPattern = await db.queryData(DBHelper.getUnitAttackPattern, {
    $unit_id: ctx.params.unit_id,
  });

  const charaStoryStatus = await db.queryData(DBHelper.getCharaStoryStatus, {
    $charaId: ctx.params.unit_id.slice(0, -2),
  });

  ctx.body = {
    charaBase,
    charaStoryStatus,
    unitRarity,
    charaPromotion,
    charaPromotionStatus,
    equipments,
    // equipmentsPromotion,
    uniqueEquipment,
    uniqueEquipmentEnhance,
    unitSkillData,
    skillData,
    skillAction,
    unitAttackPattern,
  };
});

router.get("/maxLevel", async (ctx) => {
  const level = await db.queryData(DBHelper.maxCharaLevel);
  if (level.length) {
    ctx.body = level[0]["max(team_level)"];
  } else {
    ctx.body = 0;
  }
});
router.get("/maxUniqueEquipmentLevel", async (ctx) => {
  const level = await db.queryData(DBHelper.maxUniqueEquipmentLevel);
  if (level.length) {
    ctx.body = level[0]["max(enhance_level)"];
  } else {
    ctx.body = 0;
  }
});

export default router;
