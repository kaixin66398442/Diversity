import { defineStore } from "pinia";

interface State {
  //画布
  canvas: {
    scale: number;
  };

  //物料
  material:{
    isShowMaterial:boolean;
  }
}

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useStore = defineStore("main", {
  // 推荐使用 完整类型推断的箭头函数
  state: (): State => ({
    canvas: {
      scale: 2.5, //画布适配参数
    },
    material:{
      isShowMaterial:true,
    }
  }),
  actions: {
    
  },
  getters: {},
});
