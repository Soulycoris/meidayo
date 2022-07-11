<template>
  <div class="skill-icon w-100% max-w-32 max-h-32 flex justify-center items-center relative" :style="scale ? `transform:scale(${scale})` : ''">
    <div class="w100% h100% flex relative overflow-hidden">
      <img :src="`/img/skill_icon/${curSkillBg}.png`" alt="" />
      <img class="w100% ha absolute invert" v-if="curSkill1" :class="{ 'w85% bottom-0': curSkill2 }" :src="skillIconUrl(curSkill1)" alt="" />
      <img class="w50% ha absolute top-0 right-0 invert" v-if="curSkill2" :src="skillIconUrl(curSkill2)" alt="" />
      <img class="w30% ha absolute bottom-1 right-1 z-1 invert" v-if="curSkill3" :src="skillIconUrl(curSkill3)" alt="" />
      <div class="skill-3-mark w75% h30% absolute bottom-0 right--7.5 z-0" :class="curSkillMark" v-if="curSkillMark"></div>
      <div class="box-border w100% h100% absolute top-0 b-6 b-black rd-3">
        <div class="absolute top--1.5 left--1.5 pt-1 pb-.25 pl-1 pr-1 bg-black lh-none" style="border-top-left-radius: 15px; font-size: 18px" v-if="curSkillType">{{ curSkillType }}</div>
        <div class="absolute bottom--1.5 left--1.5 pt-.25 pb-1 pl-1 pr-1 bg-black lh-none" style="border-bottom-left-radius: 15px; font-size: 18px; letter-spacing: -2px" v-if="curSkillLevel">
          <span style="font-size: 16px; letter-spacing: -1px">Lv</span>
          <span class="ml-.5" style="font-size: 18px">{{ curSkillLevel }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { host } from '@/config/host';
import { useSkillIcon, useYellSkillIcon } from '@/composables/skill';
import { Skill, ActivityAbility, LiveAbility, ActivityAbilityLevel, LiveAbilityLevel } from 'hoshimi-types/ProtoMaster';
import { findLast } from 'lodash';

interface Props {
  skill?: Skill;
  yellSkill?: ActivityAbility | LiveAbility;
  skillLevel?: number;
  skillType?: string;
  skillBg?: string;
  skill1?: string;
  skill2?: string;
  skill3?: string;
  skillMark?: string;
  scale?: number;
  level?: number;
}

const props = withDefaults(defineProps<Props>(), {
  skillLevel: 5,
  skillType: 'SP',
  skillBg: 'bg_score_1',
  scale: 0,
  level: 200,
});

const isSkill = computed(() => !!props.skill || !!props.yellSkill);

const curSkillLevel = computed(() => {
  if (!isSkill) {
    return props.skillLevel;
  }
  if (props.skill) {
    return findLast(props.skill?.levels, (n) => props.level > n.requiredCardLevel)?.level ?? 5;
  } else if (props.yellSkill) {
    return findLast<ActivityAbilityLevel | LiveAbilityLevel>(props.yellSkill?.levels, (n) => props.level > n.requiredCardLevel)?.level ?? 5;
  }
  return 5;
});
const skillIcon = computed(() => {
  if (props.skill) {
    return useSkillIcon(props.skill ?? props.yellSkill, curSkillLevel.value);
  } else if (props.yellSkill) {
    return useYellSkillIcon(props.yellSkill, curSkillLevel.value);
  }
  return null;
});
const curSkillBg = computed(() => (isSkill ? skillIcon.value?.skillBg ?? '' : props.skillBg));
const curSkill1 = computed(() => (isSkill ? skillIcon.value?.skillParts[0] ?? '' : props.skill1));
const curSkill2 = computed(() => (isSkill ? skillIcon.value?.skillParts[1] ?? '' : props.skill2));
const curSkill3 = computed(() => (isSkill ? skillIcon.value?.skillParts[2] ?? '' : props.skill3));
const curSkillMark = computed(() => (isSkill ? skillIcon.value?.skillMark ?? '' : props.skillMark));
const curSkillType = computed(() => (isSkill ? skillIcon.value?.skillType ?? '' : props.skillType));

function skillIconUrl(icon: string) {
  // `/img/skill_icon/${str}.png`
  return `${host.assetsUrl}/${icon}.png`;
}
</script>
<style lang="scss">
.skill-icon {
  font-family: 'Yu Gothic';
  font-weight: bold;
  .skill-3-mark {
    background-color: #d7d7d6;
    transform: rotate(-45deg);
    &.oneself {
      background-color: #d7d7d6;
    }
    &.down {
      background-color: #d80032;
    }
    &.opponent {
      background-color: #fc7e44;
    }
  }
}
</style>
