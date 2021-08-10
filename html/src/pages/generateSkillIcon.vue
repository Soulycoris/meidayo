<template>
  <div class="generate-sikll-icon">
    <div class="tool-left">
      <el-form :model="form" ref="form" label-width="80px" :inline="false" size="mini">
        <el-form-item label="技能等级">
          <el-select class="skill-icon-select" v-model="form.skillLevel" placeholder="请选择">
            <el-option v-for="(item, index) in [1, 2, 3, 4, 5]" :key="index" :label="item" :value="item"> </el-option>
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
          <el-select clearable class="skill-icon-select" v-model="form.skill1" placeholder="请选择">
            <el-option v-for="(item, index) in skillIconList" :key="index" :label="item" :value="item">
              <div class="skill-icon-option">
                <img :src="`/public/img/skill_icon/${item}.png`" alt="" />
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="2技能">
          <el-select clearable class="skill-icon-select" v-model="form.skill2" placeholder="请选择">
            <el-option v-for="(item, index) in skillIconList" :key="index" :label="item" :value="item">
              <div class="skill-icon-option">
                <img :src="`/public/img/skill_icon/${item}.png`" alt="" />
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="3技能">
          <el-select clearable  class="skill-icon-select" v-model="form.skill3" placeholder="请选择">
            <el-option v-for="(item, index) in skillIconList" :key="index" :label="item" :value="item">
              <div class="skill-icon-option">
                <img :src="`/public/img/skill_icon/${item}.png`" alt="" />
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
        <img class="generate-skill-1" v-if="form.skill1" :class="{ 'generate-skill-1-2': form.skill2 }" :src="`/public/img/skill_icon/${form.skill1}.png`" alt="" />
        <img class="generate-skill-2" v-if="form.skill2" :src="`/public/img/skill_icon/${form.skill2}.png`" alt="" />
        <img class="generate-skill-3" v-if="form.skill3" :src="`/public/img/skill_icon/${form.skill3}.png`" alt="" />
        <div class="generate-skill-3-mark" v-if="form.skill3"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

const skillIconList = [
  "skill_audience_amount_increase",
  "skill_audience_amount_reduction",
  "skill_beat_score_up",
  "skill_combo_continuation",
  "skill_cool_time_reduction",
  "skill_critical_bonus_permil_up",
  "skill_critical_rate_up",
  "skill_dance_down",
  "skill_dance_up",
  "skill_exp_surprise",
  "skill_fix_score_get",
  "skill_fix_stamina_recovery",
  "skill_score_get",
  "skill_score_get_by_less_fan_amount",
  "skill_score_get_by_less_stamina",
  "skill_score_get_by_more_combo_count",
  "skill_score_get_by_more_fan_amount",
  "skill_score_get_by_more_fan_engage",
  "skill_score_get_by_more_stamina",
  "skill_score_get_by_strength_effect_count",
  "skill_score_get_by_trigger",
  "skill_score_up",
  "skill_skill_impossible",
  "skill_skill_score_up",
  "skill_stamina_consumption_increase",
  "skill_stamina_consumption_reduction",
  "skill_stamina_recovery",
  "skill_strength_effect_count_increase",
  "skill_strength_effect_value_increase",
  "skill_visual_down",
  "skill_visual_up",
  "skill_vocal_down",
  "skill_vocal_up",
  "skill_weakness_effect_recovery",
  // "yell_a_fan_event_happening_probability_up",
  // "yell_a_fan_event_manager_exp_up",
  // "yell_a_promotion_gold_up",
  // "yell_a_promotion_manager_exp_up",
  // "yell_a_refresh_stamina_up",
  // "yell_l_active_skill_score",
  // "yell_l_beat_score",
  // "yell_l_card_exp",
  // "yell_l_critical_score",
  // "yell_l_dance",
  // "yell_l_gold",
  // "yell_l_manager_exp",
  // "yell_l_mental",
  // "yell_l_passive_skill",
  // "yell_l_special_skill_score",
  // "yell_l_stamina",
  // "yell_l_technique",
  // "yell_l_visual",
  // "yell_l_vocal",
];
const skillIconBgList = ["bg_score_1", "bg_score_2", "bg_score_3", "bg_special_1", "bg_special_2", "bg_special_3", "bg_strength_1", "bg_strength_2", "bg_strength_3", "bg_support_1", "bg_support_2", "bg_support_3", "bg_yell_1", "bg_yell_2", "bg_yell_3"];

export default defineComponent({
  name: "generate-sikll-icon",
  data() {
    return {
      skillIconList,
      skillIconBgList,
      form: {
        skillLevel: undefined,
        skillBg: undefined,
        skill1: undefined,
        skill2: undefined,
        skill3: undefined,
        
      },
    };
  },
  setup: () => {
    const data = reactive({
      msg: "msg",
    });
    const refData = toRefs(data);

    return {
      ...refData,
    };
  },
});
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
    .generate-skill-1 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50%;
      height: auto;
      &.generate-skill-1-2 {
        width: 40%;
        top: 65%;
        left: 40%;
      }
    }
    .generate-skill-2 {
      position: absolute;
      top: 8%;
      right: 8%;
      width: 30%;
      height: auto;
    }
    .generate-skill-3 {
      position: absolute;
      bottom: 8%;
      right: 8%;
      width: 20%;
      height: auto;
    }
    .generate-skill-3-mark {
      position: absolute;
      bottom: 0;
      right: -21%;
      width: 75%;
      height: 30%;
      background-color: #d7d7d6;
      transform: rotate(-43deg);
      z-index: 0;
    }
  }
}
</style>
<style lang="scss">
.skill-icon-option {
  img {
    width: 16px;
  }
}
</style>
