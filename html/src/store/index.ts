import { createStore, Store } from 'vuex';
import { InjectionKey } from 'vue';

// 为 store state 声明类型
export interface State {
  count: number;
  unit: unit;
}
// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol();

// 创建一个新的 store 实例
export const store = createStore<State>({
  state: {
    count: 0,
    unit: {
      id: 0,
      member_id: 0,
      title: '',
      name: '',
      spell: '',
      rarity: 0,
      propensity: '',
      type: '',
      prefab: '',
    },
  },
  mutations: {
    increment(state) {
      // 变更状态
      state.count++;
    },
    setUnit(state, unit: unit) {
      state.unit = unit;
    },
  },
});
