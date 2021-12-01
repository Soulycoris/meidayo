<template>
  <div class="generate-sikll-icon">
    <div class="tool-left">
      <el-form :model="form" label-width="80px" :inline="false" size="mini">
        <el-form-item label="技能等级">
          <el-select class="skill-icon-select" v-model="form.skillLevel" placeholder="请选择" @change="eventChange">
            <el-option v-for="(item, index) in [1, 2, 3, 4, 5]" :key="index" :label="item" :value="item"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="技能类型">
          <el-select class="skill-icon-select" v-model="form.skillType" placeholder="请选择" @change="eventChange">
            <el-option v-for="(item, index) in ['SP', 'A', 'P', 'Y']" :key="index" :label="item" :value="item"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="技能背景">
          <el-select class="skill-icon-select" v-model="form.skillBg" placeholder="请选择">
            <el-option v-for="(item, index) in skillIconBgList" :key="index" :label="item" :value="item">
              <div class="skill-icon-option">
                <img :src="`/public/img/skill_icon/${item}.png`" alt="" />
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="1技能">
          <el-select filterable clearable class="skill-icon-select" v-model="form.skill1" placeholder="请选择">
            <el-option v-for="(item, index) in skillIconList" :key="index" :label="item" :value="item">
              <div class="skill-icon-option">
                <img class="img-invert" :src="`/public/img/skill_icon/${item}.png`" alt="" />
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="2技能">
          <el-select filterable clearable class="skill-icon-select" v-model="form.skill2" placeholder="请选择">
            <el-option v-for="(item, index) in skillIconList" :key="index" :label="item" :value="item">
              <div class="skill-icon-option">
                <img class="img-invert" :src="`/public/img/skill_icon/${item}.png`" alt="" />
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="3技能">
          <el-select filterable clearable class="skill-icon-select" v-model="form.skill3" placeholder="请选择">
            <el-option v-for="(item, index) in skillIconList" :key="index" :label="item" :value="item">
              <div class="skill-icon-option">
                <img class="img-invert" :src="`/public/img/skill_icon/${item}.png`" alt="" />
              </div>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="generate-area">
      <!-- <div class="title">技能生成</div> -->
      <div class="generate-sikll-bg" v-if="form.skillBg">
        <img :src="`/public/img/skill_icon/${form.skillBg}.png`" alt="" />
        <img class="generate-skill-1 img-invert" v-if="form.skill1" :class="{ 'generate-skill-1-2': form.skill2 }" :src="`/public/img/skill_icon/${form.skill1}.png`" alt="" />
        <img class="generate-skill-2 img-invert" v-if="form.skill2" :src="`/public/img/skill_icon/${form.skill2}.png`" alt="" />
        <img class="generate-skill-3 img-invert" v-if="form.skill3" :src="`/public/img/skill_icon/${form.skill3}.png`" alt="" />
        <div class="generate-skill-3-mark" v-if="form.skill3"></div>
        <div class="generate-border">
          <div class="generate-skill-type">{{ form.skillType }}</div>
          <div class="generate-skill-level">
            <span>Lv</span>
            <span class="level-num">{{ form.skillLevel }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, onMounted } from 'vue';

const skillIconList = [
  'img_icon_skill-normal_active-skill-score-up',
  'img_icon_skill-normal_audience-amount-increase',
  'img_icon_skill-normal_audience-amount-reduction',
  'img_icon_skill-normal_beat-score-up',
  'img_icon_skill-normal_combo-continuation',
  'img_icon_skill-normal_cool-time-reduction',
  'img_icon_skill-normal_critical-bonus-permil-up',
  'img_icon_skill-normal_critical-rate-up',
  'img_icon_skill-normal_dance-down',
  'img_icon_skill-normal_dance-up',
  'img_icon_skill-normal_fix-score-get',
  'img_icon_skill-normal_fix-stamina-recovery',
  'img_icon_skill-normal_score-get-by-less-fan-amount',
  'img_icon_skill-normal_score-get-by-less-stamina',
  'img_icon_skill-normal_score-get-by-more-combo-count',
  'img_icon_skill-normal_score-get-by-more-fan-amount',
  'img_icon_skill-normal_score-get-by-more-fan-engage',
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
  'img_icon_skill-normal_strength-effect-value-increase',
  'img_icon_skill-normal_target-stamina-recovery',
  'img_icon_skill-normal_tension-up',
  'img_icon_skill-normal_visual-down',
  'img_icon_skill-normal_visual-up',
  'img_icon_skill-normal_vocal-down',
  'img_icon_skill-normal_vocal-up',
  'img_icon_skill-normal_weakness-effect-recovery',
  'img_icon_skill_sk-ai-05-idol-00-1',
  'img_icon_skill_sk-aoi-03-schl-00-1',
  'img_icon_skill_sk-aoi-04-casl-00-1',
  'img_icon_skill_sk-aoi-05-kait-00-1',
  'img_icon_skill_sk-hrk-05-mizg-01-1',
  'img_icon_skill_sk-kkr-04-casl-00-1',
  'img_icon_skill_sk-ktn-04-casl-00-1',
  'img_icon_skill_sk-ktn-05-idol-00-1',
  'img_icon_skill_sk-ktn-05-mizg-01-1',
  'img_icon_skill_sk-mei-03-schl-00-1',
  'img_icon_skill_sk-mei-05-idol-00-1',
  'img_icon_skill_sk-mna-05-idol-00-1',
  'img_icon_skill_sk-rei-04-casl-00-1',
  'img_icon_skill_sk-rei-05-rock-00-1',
  'img_icon_skill_sk-rio-05-idol-00-1',
  'img_icon_skill_sk-rui-01-casl-00-1',
  'img_icon_skill_sk-rui-04-casl-00-1',
  'img_icon_skill_sk-skr-03-schl-00-1',
  'img_icon_skill_sk-skr-05-idol-00-1',
  'img_icon_skill_sk-smr-03-schl-00-1',
  'img_icon_skill_sk-smr-05-idol-00-1',
  'img_icon_skill_sk-suz-03-schl-00-1',
  'img_icon_skill_sk-suz-05-idol-00-1',
  'img_icon_skill_sk-szk-02-mizg-01-1',
  'img_icon_skill_sk-yu-04-casl-00-1',
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
  skillLevel: 5,
  skillType: 'SP',
  skillBg: 'bg_score_1',
  skill1: '',
  skill2: '',
  skill3: '',
});
onMounted(() => {
  console.log(form);
});
const eventChange = (val) => {
  console.log(form.skillLevel);
  console.log(val);
};
const sum = () => {
  console.log(1352);
  // form1.skillLevel.value++
};
</script>
<style lang="scss" scope>
.generate-sikll-icon {
  display: flex;
  .tool-left {
    width: 240px;
    flex: none;
  }
  .skill-option {
    height: 40px;
  }
  .generate-area {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .generate-sikll-bg {
      width: 128px;
      height: 128px;
      position: relative;
      overflow: hidden;
    }
    .generate-border {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      border: 6px solid #000;
      border-radius: 10px;
      font-family: 'Yu Gothic';
      font-weight: bold;
    }
    .generate-skill-type {
      position: absolute;
      top: -6px;
      left: -6px;
      padding: 4px 3px 0px 4px;
      color: white;
      background-color: #000;
      line-height: 1;
      border-top-left-radius: 15px;
      font-size: 16px;
    }
    .generate-skill-level {
      position: absolute;
      bottom: -6px;
      left: -6px;
      padding: 1px 4px 4px 4px;
      color: white;
      background-color: #000;
      line-height: 1;
      letter-spacing: -2px;
      border-bottom-left-radius: 15px;
      span {
        font-size: 12px;
        letter-spacing: -1px;
      }
      .level-num {
        margin-left: 2px;
        font-size: 16px;
      }
    }
    .generate-skill-1 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: auto;
      &.generate-skill-1-2 {
        width: 85%;
        top: 60%;
        left: 40%;
      }
    }
    .generate-skill-2 {
      position: absolute;
      top: 0;
      right: 0;
      width: 50%;
      height: auto;
    }
    .generate-skill-3 {
      position: absolute;
      bottom: 3%;
      right: 3%;
      width: 30%;
      height: auto;
      z-index: 1;
    }
    .generate-skill-3-mark {
      position: absolute;
      bottom: 0;
      right: -23%;
      width: 75%;
      height: 30%;
      background-color: #d7d7d6;
      transform: rotate(-45deg);
      z-index: 0;
    }
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
.img-invert {
  filter: invert(100%);
}
</style>
