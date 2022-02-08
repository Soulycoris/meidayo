<template>
  <div class="generate-sikll-icon">
    <div class="tool-left">
      <el-form :model="form" label-width="80px" :inline="false" size="mini">
        <el-form-item label="技能等级">
          <el-select class="skill-icon-select" filterable allow-create clearable v-model="form.skillLevel" placeholder="请选择">
            <el-option v-for="(item, index) in 7" :key="index" :label="index" :value="index"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="技能类型">
          <el-select class="skill-icon-select" filterable allow-create clearable v-model="form.skillType" placeholder="请选择">
            <el-option v-for="(item, index) in ['SP', 'A', 'P', 'Y']" :key="index" :label="item" :value="item"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="技能背景">
          <el-select class="skill-icon-select" v-model="form.skillBg" placeholder="请选择">
            <el-option v-for="(item, index) in skillIconBgList" :key="index" :label="item" :value="item">
              <div class="skill-icon-option">
                <img :src="`/img/skill_icon/${item}.png`" alt="" />
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="1技能">
          <el-select filterable clearable class="skill-icon-select" v-model="form.skill1" placeholder="请选择">
            <el-option v-for="(item, index) in skillIconList" :key="index" :label="item" :value="item">
              <div class="skill-icon-option">
                <img class="img-invert" :src="skillIcon(item)" alt="" />
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="2技能">
          <el-select filterable clearable class="skill-icon-select" v-model="form.skill2" placeholder="请选择">
            <el-option v-for="(item, index) in skillIconList" :key="index" :label="item" :value="item">
              <div class="skill-icon-option">
                <img class="img-invert" :src="skillIcon(item)" alt="" />
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="3技能">
          <el-select filterable clearable class="skill-icon-select" v-model="form.skill3" placeholder="请选择">
            <el-option v-for="(item, index) in skillIconList" :key="index" :label="item" :value="item">
              <div class="skill-icon-option">
                <img class="img-invert" :src="skillIcon(item)" alt="" />
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-button type="text" @click="copy">复制</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tool-right">
      <skillGenerate :skill-level="form.skillLevel" :skill-type="form.skillType" :skill-bg="form.skillBg" :skill1="form.skill1" :skill2="form.skill2" :skill3="form.skill3"></skillGenerate>
    </div>
  </div>
</template>
<script setup lang="ts">
import skillGenerate from '@com/skillGenerate/skillGenerate.vue';
import { reactive } from 'vue';
import { host } from '@/config/host';
const skillIconList: string[] = [
  'img_icon_skill-normal_active-skill-score-up',
  'img_icon_skill-normal_audience-amount-increase',
  'img_icon_skill-normal_audience-amount-reduction',
  'img_icon_skill-normal_beat-score-up',
  'img_icon_skill-normal_combo-continuation',
  'img_icon_skill-normal_combo-score-up',
  'img_icon_skill-normal_cool-time-reduction',
  'img_icon_skill-normal_critical-bonus-permil-up',
  'img_icon_skill-normal_critical-rate-up',
  'img_icon_skill-normal_dance-down',
  'img_icon_skill-normal_dance-up',
  'img_icon_skill-normal_fix-score-get',
  'img_icon_skill-normal_fix-stamina-recovery',
  'img_icon_skill-normal_passive-skill-score-up',
  'img_icon_skill-normal_score-get-by-less-fan-amount',
  'img_icon_skill-normal_score-get-by-less-stamina',
  'img_icon_skill-normal_score-get-by-more-combo-count',
  'img_icon_skill-normal_score-get-by-more-fan-amount',
  'img_icon_skill-normal_score-get-by-more-fan-engage',
  'img_icon_skill-normal_score-get-by-more-stamina-use',
  'img_icon_skill-normal_score-get-by-more-stamina',
  'img_icon_skill-normal_score-get-by-skill-activation-count',
  'img_icon_skill-normal_score-get-by-status-effect-type-grade',
  'img_icon_skill-normal_score-get-by-strength-effect-count',
  'img_icon_skill-normal_score-get-by-trigger',
  'img_icon_skill-normal_score-get',
  'img_icon_skill-normal_score-up',
  'img_icon_skill-normal_skill-impossible',
  'img_icon_skill-normal_skill-success-rate-up',
  'img_icon_skill-normal_special-skill-score-up',
  'img_icon_skill-normal_stamina-consumption-increase',
  'img_icon_skill-normal_stamina-consumption-reduction',
  'img_icon_skill-normal_stamina-recovery',
  'img_icon_skill-normal_strength-effect-count-increase',
  'img_icon_skill-normal_strength-effect-migration-before-active-skill',
  'img_icon_skill-normal_strength-effect-migration-before-special-skill',
  'img_icon_skill-normal_strength-effect-value-increase',
  'img_icon_skill-normal_target-stamina-recovery',
  'img_icon_skill-normal_tension-up',
  'img_icon_skill-normal_visual-down',
  'img_icon_skill-normal_visual-up',
  'img_icon_skill-normal_vocal-down',
  'img_icon_skill-normal_vocal-up',
  'img_icon_skill-normal_weakness-effect-inversion',
  'img_icon_skill-normal_weakness-effect-prevention',
  'img_icon_skill-normal_weakness-effect-recovery',
  'img_icon_skill_sk-ai-05-idol-00-1',
  'img_icon_skill_sk-aoi-03-schl-00-1',
  'img_icon_skill_sk-aoi-04-casl-00-1',
  'img_icon_skill_sk-aoi-05-kait-00-1',
  'img_icon_skill_sk-chs-02-eve-01-1',
  'img_icon_skill_sk-hrk-05-mizg-01-1',
  'img_icon_skill_sk-kkr-04-casl-00-1',
  'img_icon_skill_sk-ktn-04-casl-00-1',
  'img_icon_skill_sk-ktn-05-idol-00-1',
  'img_icon_skill_sk-ktn-05-mizg-01-1',
  'img_icon_skill_sk-mei-03-schl-00-1',
  'img_icon_skill_sk-mei-05-idol-00-1',
  'img_icon_skill_sk-mei-05-rock-00-1',
  'img_icon_skill_sk-mna-05-idol-00-1',
  'img_icon_skill_sk-ngs-05-flow-00-1',
  'img_icon_skill_sk-rei-04-casl-00-1',
  'img_icon_skill_sk-rei-05-rock-00-1',
  'img_icon_skill_sk-rio-05-fest-00-1',
  'img_icon_skill_sk-rio-05-halw-00-1',
  'img_icon_skill_sk-rio-05-idol-00-1',
  'img_icon_skill_sk-rui-01-casl-00-1',
  'img_icon_skill_sk-rui-04-casl-00-1',
  'img_icon_skill_sk-rui-05-xmas-00-1',
  'img_icon_skill_sk-skr-03-schl-00-1',
  'img_icon_skill_sk-skr-05-idol-00-1',
  'img_icon_skill_sk-smr-03-schl-00-1',
  'img_icon_skill_sk-smr-05-idol-00-1',
  'img_icon_skill_sk-suz-03-schl-00-1',
  'img_icon_skill_sk-suz-05-idol-00-1',
  'img_icon_skill_sk-szk-02-mizg-01-1',
  'img_icon_skill_sk-yu-04-casl-00-1',
  'img_icon_skill_sk-yu-05-xmas-00-1',
  'img_icon_yell-act_character-activity-exp-up',
  'img_icon_yell-act_fan-event-happening-probability-up',
  'img_icon_yell-act_fan-event-manager-exp-up',
  'img_icon_yell-act_promotion-accessory-multi-step-reward-up',
  'img_icon_yell-act_promotion-gacha-ticket-multi-step-reward-up',
  'img_icon_yell-act_promotion-gold-up',
  'img_icon_yell-act_promotion-manager-exp-up',
  'img_icon_yell-act_refresh-stamina-up',
  'img_icon_yell-live_accessory-parameter-up',
  'img_icon_yell-live_active-skill-score-add',
  'img_icon_yell-live_active-skill-score-multiply',
  'img_icon_yell-live_audience-amount-up',
  'img_icon_yell-live_beat-score-add',
  'img_icon_yell-live_beat-score-multiply',
  'img_icon_yell-live_card-exp',
  'img_icon_yell-live_critical-score-multiply',
  'img_icon_yell-live_dance-add',
  'img_icon_yell-live_dance-multiply',
  'img_icon_yell-live_gold',
  'img_icon_yell-live_manager-exp',
  'img_icon_yell-live_mental-add',
  'img_icon_yell-live_mental-multiply',
  'img_icon_yell-live_passive-skill',
  'img_icon_yell-live_photo-level-up',
  'img_icon_yell-live_special-skill-score-add',
  'img_icon_yell-live_special-skill-score-multiply',
  'img_icon_yell-live_stamina-add',
  'img_icon_yell-live_stamina-multiply',
  'img_icon_yell-live_technique-add',
  'img_icon_yell-live_technique-multiply',
  'img_icon_yell-live_visual-add',
  'img_icon_yell-live_visual-multiply',
  'img_icon_yell-live_vocal-add',
  'img_icon_yell-live_vocal-multiply',
];
const skillIconBgList = ['bg_score_1', 'bg_score_2', 'bg_score_3', 'bg_special_1', 'bg_special_2', 'bg_special_3', 'bg_strength_1', 'bg_strength_2', 'bg_strength_3', 'bg_support_1', 'bg_support_2', 'bg_support_3', 'bg_yell_1', 'bg_yell_2', 'bg_yell_3'];

let form = reactive({
  skillLevel: 0,
  skillType: '',
  skillBg: 'bg_score_1',
  skill1: '',
  skill2: '',
  skill3: '',
});
const copy = () => {
  let clipboard = navigator.clipboard;
  if (!clipboard) {
    console.log('浏览器不支持啊.');
    return;
  }
  let str = `<skillGenerate skill-level="${form.skillLevel}" skill-type="${form.skillType}" skill-bg="${form.skillBg}" skill1="${form.skill1}" skill2="${form.skill2}" skill3="${form.skill3}"></skillGenerate>`;
  navigator.clipboard
    .writeText(str)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {});
};
function skillIcon(icon: string) {
  // `/img/skill_icon/${str}.png`
  return `${host.assetsUrl}/${icon}.png`;
}
</script>
<style lang="scss" scope>
.generate-sikll-icon {
  background-color: #fff;
  display: flex;
  .tool-left {
    width: 240px;
    flex: none;
  }
  .tool-right {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  .skill-option {
    height: 40px;
  }
}
</style>
<style lang="scss">
.skill-icon-option {
  display: flex;
  align-items: center;
  img {
    width: 16px;
  }
}
img.img-invert {
  filter: invert(100%);
}
</style>
