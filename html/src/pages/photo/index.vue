<template>
  <div class="photo">
    <template v-for="skill in photoList" :key="index">
      <div class="flex fw-bold">
        <div class="w-16 h-16 relative fill-none">
          <skillIcon class="absolute w-32 top-50% left-50% transform" style="--un-translate-x: -50%; --un-translate-y: -50%; --un-scale-x: 0.5; --un-scale-y: 0.5" :skill="skill"></skillIcon>
        </div>
        <div class="flex-1 flex flex-col justify-around pl-4 pr-4">
          <div class="text-opacity-80 fw-bold text-size-lg">{{ skill.name }}</div>
        </div>
      </div>
      <div class="w100% flex-none mt-1.5 mb-8 fw-bold text-opacity-80 text-size-sm" style="letter-spacing: 1px"></div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { ActivityAbilityLevel, LiveAbilityLevel, PhotoAbility, SkillLevel } from 'hoshimi-types/ProtoMaster';
import { findLast } from 'lodash';

const photoList = reactive<PhotoAbility[]>([]);

let level = ref(200);

function skillDesc(levels: SkillLevel[] | LiveAbilityLevel[] | ActivityAbilityLevel[]) {
  return findLast<SkillLevel | LiveAbilityLevel | ActivityAbilityLevel>(levels, (n) => level.value > n.requiredCardLevel)?.description.replaceAll('\n', '<br />') ?? '';
}

</script>
<style lang="scss"></style>
