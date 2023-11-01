import { Data, Block } from "@/type/data";
import { defineStore } from "pinia";
import { ref } from "vue";

interface State {
  //画布
  canvas: {
    scale: number; //画布适配
    canvasRef: any; //画布dom
    isPreview: boolean; //是否预览
    lastSelectBlock: Block | null; //最后一个选中的block
  };

  //物料
  material: {
    isShowMaterial: boolean;
    materialWidth: number;
  };

  //操作区
  operator: {
    isShowOperator: boolean;
    pageSizeArr: any;
    pageSizeValue: string;
    isShowGrid: boolean;
    gridTypeArr: any;
    gridTypeValue: string;
    gridSpacingValue: number;
    gridSpacingMaxValue: number;
    gridSpacingMinValue: number;
    gridColorSecondValue: string;
    gridColorMainValue: string;
    gridBackgroundColorValue: string;
    pageSizeType: string;
    canvaDirectionArr: any;
    canvaDirectionValue: string;
  };
}

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useStore = defineStore("main", {
  // 推荐使用 完整类型推断的箭头函数
  state: (): State => ({
    canvas: {
      scale: 1, //画布适配参数（要适配A4的话1显得画布太小了）
      canvasRef: ref(null), //画布dom
      isPreview: false, //是否预览
      lastSelectBlock: null,
    },
    material: {
      isShowMaterial: true,
      // 物料栏的宽度
      materialWidth: 250,
    },
    operator: {
      isShowOperator: true,
      // 页面尺寸选择框数据列表
      pageSizeArr: [
        {
          label: "A3(1500px*2100px)",
          value: "1500 2100",
        },
        {
          label: "A4(1050px*1500px)",
          value: "1050 1500",
        },
        {
          label: "A5(750px*1050px)",
          value: "750 1050",
        },
      ],
      // 选中的页面尺寸
      pageSizeValue: "A4(1050px*1500px)",
      // 是否显示网格
      isShowGrid: true,
      // 网格类型列表"fixedDot"
      gridTypeArr: [
        {
          label: "点阵网格",
          value: "dot",
        },
        {
          label: "固定点阵",
          value: "fixedDot",
        },
        {
          label: "网格",
          value: "mesh",
        },
        {
          label: "双线网格",
          value: "doubleMesh",
        },
      ],
      // 选中的网格类型
      gridTypeValue: "doubleMesh",
      // 网格间距
      gridSpacingValue: 10,
      // 网格间距最大值
      gridSpacingMaxValue: 20,
      // 网格间距最小值
      gridSpacingMinValue: 1,
      // 网格颜色(主)
      gridColorMainValue: "#f2f2f2",
      // 网格颜色(次)
      gridColorSecondValue: "#e5e5e5",
      // 背景颜色
      gridBackgroundColorValue: "#fff",
      // 页面大小是选择预设还是自定义（默认预设）
      pageSizeType: "preset", // 预设：preset || 自定义：custom
      // 画布横向或竖向（默认横向）
      canvaDirectionArr: [
        // 横向：transverse || 竖向： vertical
        {
          label: "横向页面",
          value: "transverse",
        },
        {
          label: "竖向页面",
          value: "vertical",
        },
      ],
      canvaDirectionValue: "transverse",
    },
  }),
  actions: {
    //更新data数据
    updateData: (data: Data, obj: Block) => {
      console.log(data);
      data.blocks.push(obj);
    },
  },
  getters: {},
});
