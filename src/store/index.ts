import { Data, Block } from "@/type/data";
import { defineStore } from "pinia";
import { ref } from "vue";

interface State {
  //画布
  canvas: {
    scale: number; //画布适配
    canvasRef: any; //画布dom
    isPreview: boolean; //是否预览
  };

  //物料
  material: {
    isShowMaterial: boolean;
  };

  //操作区
  operator: {
    isShowOperator: boolean;
  };
}

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useStore = defineStore("main", {
  // 推荐使用 完整类型推断的箭头函数
  state: (): State => ({
    canvas: {
      scale: 1, //画布适配参数
      canvasRef: ref(null), ////画布dom
      isPreview: false, //是否预览
    },
    material: {
      isShowMaterial: true,
    },
    operator: {
      isShowOperator: false,
    },
  }),
  actions: {
    //更新data数据
    updateData: (data: Data, obj: Block) => {
      data.blocks.push(obj);
    },
  },
  getters: {},
});
