<template>
  <transition name="fade">
    <div class="filter fixed z-10 top-0 bottom-0 w-100vw h-100vh" v-if="show">
      <div class="mark w-100% h-100%" @click.self="confirm"></div>
      <div class="card-filter absolute bottom-0 w-100% flex flex-col">
        <div class="nav-center lh-10 text-center">筛选</div>
        <div class="card-filter-inner w-100% ha">
          <div class="search-item h-100% pl-4 pr-4">
            <div class="title mt-2 mb-2 flex justify-between items-center">
              <div @dblclick="update">类型</div>
              <div class="flex">
                <span class="tool-item" @click="eventSelect('cardType', true)">全选</span>
                <span class="tool-item" @click="eventSelect('cardType', false)">取消</span>
              </div>
            </div>
            <div class="flex flex-wrap">
              <div class="w-30% flex flex-wrap items-center" v-for="item in cardTypeMap">
                <input type="checkbox" :id="item[1].name" :value="item[0]" v-model="searchForm.cardType" />
                <label class="flex items-center m1" :for="item[1].name">
                  <img class="img-max w8" :src="`/img/icon/icon_${item[1].name}_thumbnail.png`" />
                </label>
              </div>
            </div>
            <div class="title mt-2 mb-2 flex justify-between items-center">
              <div>倾向</div>
              <div class="flex">
                <span class="tool-item" @click="eventSelect('propensity', true)">全选</span>
                <span class="tool-item" @click="eventSelect('propensity', false)">取消</span>
              </div>
            </div>
            <div class="flex flex-wrap">
              <div class="w-30% flex flex-wrap items-center" v-for="item in cardPropensityMap">
                <input type="checkbox" :id="item[1].name" :value="item[1].name" v-model="searchForm.propensity" />
                <label class="flex items-center m1" :for="item[1].name">
                  <div class="maskedimage" :class="'maskedimage-' + item[1].name"></div>
                </label>
              </div>
            </div>
            <div class="title mt-2 mb-2 flex justify-between items-center">
              <div>角色</div>
              <div class="tool">
                <span class="tool-item" @click="eventSelect('character', true)">全选</span>
                <span class="tool-item" @click="eventSelect('character', false)">取消</span>
              </div>
            </div>
            <div class="flex flex-wrap">
              <template v-for="item in characterStore.character">
                <div class="w-30% flex flex-wrap items-center" v-if="item.type !== CharacterType['Npc']">
                  <input type="checkbox" :id="item.id" :value="item.id" v-model="searchForm.character" />
                  <label class="flex items-center m1" :for="item.id">
                    <img class="img-max w8" :src="memberIcon(item.assetId)" />
                  </label>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import axios from 'axios';
import { host } from '@/config/host';
import { cardPropensityMap, cardTypeMap } from '@/assets/utils/typeMap';
import { useCharacterStore } from '@/stores/character';
import { CardPropensity } from '@/ProtoTypes';
import { CardType, CharacterType } from 'hoshimi-types/ProtoEnum';

const characterStore = useCharacterStore();

interface CardListFilterForm {
  cardType: CardType[];
  propensity: CardPropensity[];
  character: string[];
}

let updateTag = 0;
const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: 'on-confirm', form: CardListFilterForm): void;
}>();

const searchForm = reactive<CardListFilterForm>({
  cardType: [],
  propensity: [],
  character: [],
});

function confirm() {
  emit('on-confirm', searchForm);
}

function eventSelect(target: keyof CardListFilterForm, event: boolean) {
  if (!event) {
    searchForm[target]?.splice(0);
    return;
  }
  if (target === 'cardType') {
    searchForm[target] = Array.from(cardTypeMap.keys());
  } else if (target === 'propensity') {
    searchForm[target] = Array.from(cardPropensityMap.values()).map((e) => e.name) as CardPropensity[];
  } else if (target === 'character') {
    searchForm[target] = characterStore.character.map((e) => e.id);
  }
}

function update() {
  updateTag++;
  if (updateTag > 2) {
    alert('update');
    updateTag = 0;
    axios.get(`/db/update`);
  }
}
function memberIcon(name: string) {
  if (!name) {
    return '';
  }
  return `${host.assetsUrl}/img_chr_icon_${name}.png`;
}
</script>
<style lang="scss">
.filter {
  color: #fff;
  .mark {
    background-color: rgba(76, 76, 76, 0.8);
  }
}
.card-filter {
  background-color: var(--background-color-base);
  transition: transform 0.3s ease-in-out;
  .nav-center {
    font-size: 16px;
  }
  &.show {
    transform: translateY(0);
  }
  &.hide {
    transform: translateY(-140%);
  }
  .search-item {
    font-size: 16px;
    .tool-item {
      font-size: 12px;
      padding: 0 6px;
    }
  }
}
</style>
