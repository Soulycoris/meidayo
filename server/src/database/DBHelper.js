// 数据查询

const DBHelper = {
  /**
   * 获取角色列表
   */
  getCharaList: `
  SELECT ud.unit_id
    ,ud.unit_name
    ,ud.prefab_id
    ,ud.search_area_width
    ,ud.atk_type
    ,ud.start_time
    ,up.age
    ,up.height
    ,up.weight
    ,ur.rarity 
    ,au.unit_name as actual_name
    FROM (SELECT unit_id,
         rarity,
         row_number()over(partition by unit_id order by rarity DESC) rn
  FROM unit_rarity) AS ur 
  JOIN unit_data AS ud ON ud.unit_id = ur.unit_id 
  LEFT JOIN unit_profile AS up ON ud.unit_id = up.unit_id 
  LEFT JOIN actual_unit_background AS au ON substr(ud.unit_id,1,4) = substr(au.unit_id,1,4) 
  WHERE ur.rn < 2 AND ud.comment <> ''`,
  /**
   *
   * 获取角色基础数据
   */
  getCharaBase: ` 
    SELECT ud.unit_id
    ,ud.unit_name
    ,ud.kana
    ,ud.prefab_id
    ,ud.move_speed
    ,ud.search_area_width
    ,ud.atk_type
    ,ud.normal_atk_cast_time
    ,ud.guild_id
    ,ud.comment
    ,ud.start_time
    ,up.age
    ,up.guild
    ,up.race
    ,up.height
    ,up.weight
    ,up.birth_month
    ,up.birth_day
    ,up.blood_type
    ,up.favorite
    ,up.voice
    ,up.catch_copy
    ,up.self_text
    ,IFNULL(au.unit_name, ud.unit_name) 'actual_name' 
    FROM unit_data AS ud 
    LEFT JOIN unit_profile AS up ON ud.unit_id = up.unit_id 
    LEFT JOIN actual_unit_background AS au ON substr(ud.unit_id,1,4) = substr(au.unit_id,1,4) 
    WHERE ud.comment <> '' `,
  /**
   * 获取角色基础数据
   * @param unit_id unit_id
   */
  getCharaBaseById: `SELECT ud.unit_id
    ,ud.unit_name
    ,ud.kana
    ,ud.prefab_id
    ,ud.move_speed
    ,ud.search_area_width
    ,ud.atk_type
    ,ud.normal_atk_cast_time
    ,ud.guild_id
    ,ud.comment
    ,ud.start_time
    ,up.age
    ,up.guild
    ,up.race
    ,up.height
    ,up.weight
    ,up.birth_month
    ,up.birth_day
    ,up.blood_type
    ,up.favorite
    ,up.voice
    ,up.catch_copy
    ,up.self_text
    ,au.unit_name as actual_name
    FROM unit_data AS ud 
    LEFT JOIN unit_profile AS up ON up.unit_id = $unit_id
    LEFT JOIN actual_unit_background AS au ON substr($unit_id,1,4) = substr(au.unit_id,1,4) 
    WHERE ud.unit_id = $unit_id`,
  /**
   * 获取角色星级数据
   * @param unit_id unit_id
   */
  getUnitRarity: `SELECT * 
  FROM unit_rarity 
  WHERE unit_id=$unit_id 
  ORDER BY rarity DESC `,
  /**
   * 获取角色剧情数据 国服
   */
  getCharaStoryStatusCn: `SELECT a.* 
  FROM chara_story_status AS a
  INNER JOIN unit_data AS b ON substr(a.story_id,1,4) = substr(b.unit_id,1,4)
  WHERE a.chara_id_1 = $charaId 
  OR a.chara_id_2 = $charaId 
  OR a.chara_id_3 = $charaId 
  OR a.chara_id_4 = $charaId 
  OR a.chara_id_5 = $charaId 
  OR a.chara_id_6 = $charaId 
  OR a.chara_id_7 = $charaId 
  OR a.chara_id_8 = $charaId 
  OR a.chara_id_9 = $charaId 
  OR a.chara_id_10 = $charaId`,
  /**
   * 获取角色剧情数据
   * @param $charaId 
   */
  getCharaStoryStatus: ` SELECT * 
  FROM chara_story_status 
  WHERE chara_id_1 = $charaId 
  OR chara_id_2 = $charaId 
  OR chara_id_3 = $charaId 
  OR chara_id_4 = $charaId 
  OR chara_id_5 = $charaId 
  OR chara_id_6 = $charaId 
  OR chara_id_7 = $charaId 
  OR chara_id_8 = $charaId 
  OR chara_id_9 = $charaId 
  OR chara_id_10 = $charaId `,
  /**
   * 获取角色Rank汇总数据
   * @param unit_id unit_id
   */
  getCharaPromotionStatus: `SELECT * 
  FROM unit_promotion_status 
  WHERE unit_id=$unit_id 
  ORDER BY promotion_level DESC`,
  /**
   * 获取角色装备数据
   * @param unit_id unit_id
   */
  getCharaPromotion: `SELECT * 
  FROM unit_promotion 
  WHERE unit_id=$unit_id
  ORDER BY promotion_level DESC`,
  /**
   * 获取装备数据 @param $slots 装备ids
   * in 后面()要拼接
   */
  getEquipments: `SELECT 
  a.*
  ,b.max_equipment_enhance_level 
  FROM equipment_data a, 
  ( SELECT promotion_level, max( equipment_enhance_level ) max_equipment_enhance_level FROM equipment_enhance_data GROUP BY promotion_level ) b 
  WHERE a.promotion_level = b.promotion_level 
  AND a.equipment_id IN `,
  /**
   * 获取所有装备数据
   */
  getEquipmentAll: `SELECT 
  a.* 
  ,ifnull(b.max_equipment_enhance_level, 0) 'max_equipment_enhance_level'
  ,e.description 'catalog' 
  ,substr(a.equipment_id,3,1) * 10 + substr(a.equipment_id,6,1) 'rarity' 
  ,f.condition_equipment_id_1
  ,f.consume_num_1
  ,f.condition_equipment_id_2
  ,f.consume_num_2
  ,f.condition_equipment_id_3
  ,f.consume_num_3
  ,f.condition_equipment_id_4
  ,f.consume_num_4
  ,f.condition_equipment_id_5
  ,f.consume_num_5
  ,f.condition_equipment_id_6
  ,f.consume_num_6
  ,f.condition_equipment_id_7
  ,f.consume_num_7
  ,f.condition_equipment_id_8
  ,f.consume_num_8
  ,f.condition_equipment_id_9
  ,f.consume_num_9
  ,f.condition_equipment_id_10
  ,f.consume_num_10
  FROM equipment_data a  
  LEFT JOIN ( SELECT promotion_level, max( equipment_enhance_level ) max_equipment_enhance_level FROM equipment_enhance_data GROUP BY promotion_level ) b ON a.promotion_level = b.promotion_level 
  LEFT JOIN equipment_enhance_rate AS e ON a.equipment_id=e.equipment_id
  LEFT JOIN equipment_craft AS f ON a.equipment_id = f.equipment_id
  WHERE a.equipment_id < 113000 
  ORDER BY substr(a.equipment_id,3,1) * 10 + substr(a.equipment_id,6,1) DESC, a.require_level DESC, a.equipment_id ASC`,
  /**
   * 获取装备强化数据
   * @param equipmentId equipmentId
   */
  getEquipmentEnhance: `SELECT * 
    FROM equipment_enhance_rate 
    WHERE equipment_id = $equipmentId`,
  /**
   * 获取装备强化数据
   * @param slots 装备ids
   */
  getEquipmentEnhanceList: `SELECT * 
      FROM equipment_enhance_rate 
      WHERE equipment_id IN ( $slots ) `,
  /**
   * 获取所有装备强化数据
   */
  getEquipmentEnhance: `SELECT * 
    FROM equipment_enhance_rate `,
  /**
   * 获取专属装备数据
   * @param unit_id unit_id
   */
  getUniqueEquipment: `SELECT e.*
    ,c.item_id_1
    ,c.consume_num_1
    ,c.item_id_2
    ,c.consume_num_2
    ,c.item_id_3
    ,c.consume_num_3
    ,c.item_id_4
    ,c.consume_num_4
    ,c.item_id_5
    ,c.consume_num_5
    ,c.item_id_6
    ,c.consume_num_6
    ,c.item_id_7
    ,c.consume_num_7
    ,c.item_id_8
    ,c.consume_num_8
    ,c.item_id_9
    ,c.consume_num_9
    ,c.item_id_10
    ,c.consume_num_10
    FROM unique_equipment_data AS e 
    JOIN unit_unique_equip AS u ON e.equipment_id=u.equip_id 
    LEFT JOIN unique_equipment_craft AS c ON e.equipment_id=c.equip_id
    WHERE u.unit_id=$unit_id`,
  /**
   * 获取专属装备强化数据
   * @param unit_id unit_id
   */
  getUniqueEquipmentEnhance: `SELECT e.* 
    FROM unique_equipment_enhance_rate AS e 
    JOIN unit_unique_equip AS u ON e.equipment_id=u.equip_id 
    WHERE u.unit_id=$unit_id`,
  /**
   * 获取角色技能数据
   * @param unit_id unit_id
   */
  getUnitSkillData: `SELECT * 
  FROM unit_skill_data 
  WHERE unit_id=$unit_id`,
  /**
   * 获取技能数据
   * @param in () skillId
   */
  getSkillData: `SELECT * 
    FROM skill_data 
    WHERE skill_id in `,
  /**
   * 获取技能动作数据
   * @param in () actionId
   */
  getSkillAction: `SELECT * 
    FROM skill_action 
    WHERE action_id in `,
  /**
   * 获取行动顺序
   * @param unit_id unit_id
   */
  getUnitAttackPattern: `SELECT * 
    FROM unit_attack_pattern 
    WHERE unit_id=$unit_id 
    ORDER BY pattern_id `,
  /**
   * 获取会战期次 国服
   */
  getClanBattlePeriodCn: `SELECT * 
  FROM clan_battle_period 
  ORDER BY clan_battle_id DESC`,
  /**
   * 获取会战期次
   */
  getClanBattlePeriodCn: `SELECT * 
  FROM clan_battle_period 
  WHERE clan_battle_id > 1014 
  ORDER BY clan_battle_id DESC`,
  /**
   * 获取会战phase 国服
   */
  getClanBattlePhaseCn: `SELECT 
  a.difficulty 'phase'
  ,b1.wave_group_id 'wave_group_id_1'
  ,b2.wave_group_id 'wave_group_id_2'
  ,b3.wave_group_id 'wave_group_id_3'
  ,b4.wave_group_id 'wave_group_id_4'
  ,b5.wave_group_id 'wave_group_id_5'
  FROM clan_battle_map_data AS a 
  JOIN clan_battle_boss_group AS b1 ON a.clan_battle_boss_group_id = b1.clan_battle_boss_group_id AND b1.order_num = 1
  JOIN clan_battle_boss_group AS b2 ON a.clan_battle_boss_group_id = b2.clan_battle_boss_group_id AND b2.order_num = 2
  JOIN clan_battle_boss_group AS b3 ON a.clan_battle_boss_group_id = b3.clan_battle_boss_group_id AND b3.order_num = 3
  JOIN clan_battle_boss_group AS b4 ON a.clan_battle_boss_group_id = b4.clan_battle_boss_group_id AND b4.order_num = 4
  JOIN clan_battle_boss_group AS b5 ON a.clan_battle_boss_group_id = b5.clan_battle_boss_group_id AND b5.order_num = 5
  WHERE a.clan_battle_id=$clanBattleId 
  AND a.lap_num_from <> a.lap_num_to
  ORDER BY a.difficulty DESC`,
  /**
   * 获取会战phase
   */
  getBeanListByRaw: `SELECT DISTINCT 
  phase 
  ,wave_group_id_1 
  ,wave_group_id_2 
  ,wave_group_id_3 
  ,wave_group_id_4 
  ,wave_group_id_5 
  FROM clan_battle_2_map_data WHERE clan_battle_id=$clanBattleId 
  ORDER BY phase DESC`,

  /**
   * 获取wave
   * @param
   * @return
   */
  getWaveGroupDataList: `SELECT * 
    FROM wave_group_data 
    WHERE wave_group_id IN ( %s ) `,

  /**
   * 获取wave
   * @param
   * @return
   */
  getWaveGroupData: `SELECT * 
    FROM wave_group_data 
    WHERE wave_group_id = $waveGroupId`,

  /**
   * 获取enemyList
   * @param
   * @return
   */
  getEnemyCn: `SELECT 
    a.* 
    ,b.union_burst 
    ,b.union_burst_evolution 
    ,b.main_skill_1 
    ,b.main_skill_evolution_1 
    ,b.main_skill_2 
    ,b.main_skill_evolution_2 
    ,b.ex_skill_1 
    ,b.ex_skill_evolution_1 
    ,b.main_skill_3 
    ,b.main_skill_4 
    ,b.main_skill_5 
    ,b.main_skill_6 
    ,b.main_skill_7 
    ,b.main_skill_8 
    ,b.main_skill_9 
    ,b.main_skill_10 
    ,b.ex_skill_2 
    ,b.ex_skill_evolution_2 
    ,b.ex_skill_3 
    ,b.ex_skill_evolution_3 
    ,b.ex_skill_4 
    ,b.ex_skill_evolution_4 
    ,b.ex_skill_5 
    ,b.sp_skill_1 
    ,b.ex_skill_evolution_5 
    ,b.sp_skill_2 
    ,b.sp_skill_3 
    ,b.sp_skill_4 
    ,b.sp_skill_5 
    ,u.prefab_id 
    ,u.atk_type 
    ,u.normal_atk_cast_time
    ,u.search_area_width
    ,u.comment
    FROM 
    unit_skill_data b 
    ,enemy_parameter a 
    LEFT JOIN unit_enemy_data u ON a.unit_id = u.unit_id 
    WHERE 
    a.unit_id = b.unit_id 
    AND a.enemy_id in ( %s )`,
  /**
   * 获取enemyList
   * @param
   * @return
   */
  getBeanListByRaw: `SELECT 
    a.* 
    ,b.union_burst 
    ,b.union_burst_evolution 
    ,b.main_skill_1 
    ,b.main_skill_evolution_1 
    ,b.main_skill_2 
    ,b.main_skill_evolution_2 
    ,b.ex_skill_1 
    ,b.ex_skill_evolution_1 
    ,b.main_skill_3 
    ,b.main_skill_4 
    ,b.main_skill_5 
    ,b.main_skill_6 
    ,b.main_skill_7 
    ,b.main_skill_8 
    ,b.main_skill_9 
    ,b.main_skill_10 
    ,b.ex_skill_2 
    ,b.ex_skill_evolution_2 
    ,b.ex_skill_3 
    ,b.ex_skill_evolution_3 
    ,b.ex_skill_4 
    ,b.ex_skill_evolution_4 
    ,b.ex_skill_5 
    ,b.sp_skill_1 
    ,b.ex_skill_evolution_5 
    ,b.sp_skill_2 
    ,b.sp_skill_3 
    ,b.sp_skill_4 
    ,b.sp_skill_5 
    ,c.child_enemy_parameter_1 
    ,c.child_enemy_parameter_2 
    ,c.child_enemy_parameter_3 
    ,c.child_enemy_parameter_4 
    ,c.child_enemy_parameter_5 
    ,u.prefab_id 
    ,u.atk_type 
    ,u.normal_atk_cast_time
    ,u.search_area_width
    ,u.comment
    FROM 
    unit_skill_data b 
    ,enemy_parameter a 
    LEFT JOIN enemy_m_parts c ON a.enemy_id = c.enemy_id 
    LEFT JOIN unit_enemy_data u ON a.unit_id = u.unit_id 
    WHERE 
    a.unit_id = b.unit_id 
    AND a.enemy_id in ( %s )`,

  /**
   * 获取敌人抗性值
   * @param
   * @return
   */
  getResistData: `SELECT * 
    FROM resist_data 
    WHERE resist_status_id=$resistStatusId`,

  /**
   * 获取友方召唤物
   */
  getUnitMinion: `SELECT
    a.*,
    b.union_burst,
    b.union_burst_evolution,
    b.main_skill_1,
    b.main_skill_evolution_1,
    b.main_skill_2,
    b.main_skill_evolution_2,
    b.ex_skill_1,
    b.ex_skill_evolution_1,
    b.main_skill_3,
    b.main_skill_4,
    b.main_skill_5,
    b.main_skill_6,
    b.main_skill_7,
    b.main_skill_8,
    b.main_skill_9,
    b.main_skill_10,
    b.ex_skill_2,
    b.ex_skill_evolution_2,
    b.ex_skill_3,
    b.ex_skill_evolution_3,
    b.ex_skill_4,
    b.ex_skill_evolution_4,
    b.ex_skill_5,
    b.sp_skill_1,
    b.ex_skill_evolution_5,
    b.sp_skill_2,
    b.sp_skill_3,
    b.sp_skill_4,
    b.sp_skill_5
FROM
    unit_skill_data b,
    unit_data a
WHERE
    a.unit_id = b.unit_id
    AND a.unit_id = $minionId`,

  /**
   * 获取敌方召唤物
   */
  getEnemyMinion: `SELECT
    d.unit_name,
    d.prefab_id,
    d.search_area_width,
    d.atk_type,
    d.move_speed,
    a.*,
    b.*,
    d.normal_atk_cast_time,
    c.child_enemy_parameter_1,
    c.child_enemy_parameter_2,
    c.child_enemy_parameter_3,
    c.child_enemy_parameter_4,
    c.child_enemy_parameter_5
    FROM
    enemy_parameter a
    JOIN unit_skill_data AS b ON a.unit_id = b.unit_id
    JOIN unit_enemy_data AS d ON a.unit_id = d.unit_id
    LEFT JOIN enemy_m_parts c ON a.enemy_id = c.enemy_id
    WHERE a.enemy_id = $enemyId`,

  /**
   * 获取迷宫bossList
   * @param
   * @return
   */
  getDungeons: `SELECT
    a.dungeon_area_id,
    a.dungeon_name,
    a.description,
    b.*
    FROM
    dungeon_area_data AS a 
    JOIN wave_group_data AS b ON a.wave_group_id=b.wave_group_id 
    ORDER BY a.dungeon_area_id DESC`,
  /**
   * 获取所有Quest
   */
  getQuests: `SELECT * FROM quest_data WHERE quest_id < 13000000 ORDER BY daily_limit ASC, quest_id DESC`,

  /**
   * 获取掉落奖励
   */
  getEnemyRewardData: `SELECT * 
  FROM enemy_reward_data 
  WHERE drop_reward_id IN ( %s )`,
  /**
   * 获取campaign日程
   */
  getCampaignSchedule: `SELECT * FROM campaign_schedule  WHERE end_time > '$it' `,

  /**
   * 获取free gacha日程
   */
  getFreeGachaSchedule: `SELECT * FROM campaign_freegacha WHERE end_time > '$it' `,
  /**
   * 获取hatsune日程
   */
  getHatsuneSchedule: `SELECT a.event_id, a.start_time, a.end_time, b.title 
  FROM hatsune_schedule AS a JOIN event_story_data AS b ON a.event_id = b.value
  WHERE a.end_time > '$it' 
  ORDER BY a.event_id DESC `,

  /**
   * 获取hatsune一般boss数据
   */
  getHatsuneBattle: `SELECT
    a.*
    FROM
    hatsune_boss a
    WHERE
    event_id = $eventId 
    AND area_id <> 0 `,

  /**
   * 获取hatsune SP boss数据
   */
  getHatsuneSP: `SELECT
    a.*
    FROM hatsune_special_battle a
    WHERE event_id = $eventId`,

  /**
   * 获取露娜塔日程
   */
  getTowerSchedule: ` SELECT * FROM tower_schedule WHERE end_time > '$it' `,
  /**
   * 获取装备碎片
   */
  getEquipmentPiece: `SELECT * FROM equipment_data WHERE equipment_id >= 113000`,

  /**
   * 获取异常状态map
   * @param
   * @return
   */
  ailmentMap: `SELECT * FROM ailment_data`,
  /**
   * 获取最大角色等级
   */
  maxCharaLevel: `SELECT max(team_level) FROM experience_team`,
  /**
   * 获取最大角色Rank
   */
  maxCharaRank: `SELECT max(promotion_level) FROM unit_promotion`,
  /**
   * 获取最大专武等级
   */
  maxUniqueEquipmentLevel: `SELECT max(enhance_level) FROM unique_equipment_enhance_data`,
  /**
   * 获取最大敌人等级
   */
  maxEnemyLevel: `SELECT MAX(level) FROM enemy_parameter`,
};
export default DBHelper
