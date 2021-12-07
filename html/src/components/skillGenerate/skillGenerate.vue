<template>
  <div class="generate-area" :style="{ transform: `scale(${scale})` }">
    <!-- <div class="title">技能生成</div> -->
    <div class="generate-sikll-bg" v-if="skillBg">
      <img :src="`/img/skill_icon/${skillBg}.png`" alt="" />
      <img class="generate-skill-1 img-invert" v-if="skill1" :class="{ 'generate-skill-1-2': skill2 }" :src="`/img/skill_icon/${skill1}.png`" alt="" />
      <img class="generate-skill-2 img-invert" v-if="skill2" :src="`/img/skill_icon/${skill2}.png`" alt="" />
      <img class="generate-skill-3 img-invert" v-if="skill3" :src="`/img/skill_icon/${skill3}.png`" alt="" />
      <div class="generate-skill-3-mark" v-if="skill3"></div>
      <div class="generate-border">
        <div class="generate-skill-type" v-if="skillType">{{ skillType }}</div>
        <div class="generate-skill-level" v-if="skillLevel">
          <span>Lv</span>
          <span class="level-num">{{ skillLevel }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  skillLevel: {
    type: String,
    default: '5',
  },
  skillType: {
    type: String,
    default: 'SP',
  },
  skillBg: {
    type: String,
    default: 'bg_score_1',
  },
  skill1: {
    type: String,
    default: '',
  },
  skill2: {
    type: String,
    default: '',
  },
  skill3: {
    type: String,
    default: '',
  },
  scale: {
    type: Number,
    default: 1,
  },
});
</script>
<style lang="scss">
.generate-area {
  width: 100%;
  max-width: 128px;
  max-height: 128px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .generate-sikll-bg {
    width: 100%;
    height: 100%;
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
    padding: 4px 3px 1px 4px;
    color: white;
    background-color: #000;
    line-height: 1;
    border-top-left-radius: 15px;
    font-size: 18px;
  }
  .generate-skill-level {
    position: absolute;
    bottom: -6px;
    left: -6px;
    padding: 1px 2px 4px 4px;
    color: white;
    background-color: #000;
    line-height: 1;
    letter-spacing: -2px;
    border-bottom-left-radius: 15px;
    span {
      font-size: 16px;
      letter-spacing: -1px;
    }
    .level-num {
      margin-left: 2px;
      font-size: 18px;
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
      // transform: translate(-50%, -50%) translateZ(0) scale(0.85);
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
</style>
