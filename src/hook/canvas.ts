//列表可以显示所有的物料
//key对应的组件映射关系
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref
} from "vue";
import {
  Component,
  ComponentMap,
  CreateCanvasConfigResult,
} from "@/type/canvas";
import {
  createCanvasContext,
  StartNode,
  DecisionNode,
  ProcessNode,
  ManualOperationNode,
  ArcProcessNode,
  CircleNode,
} from "@/hook/flowchart";
import { ElInput } from "element-plus";

import { useCreateBlock } from "@/hook/useCreateBlock";

function createCanvasConfig(): CreateCanvasConfigResult {
  const componentList: Component[] = [];
  const componentMap: ComponentMap = {};

  return {
    register: (component: Component) => {
      componentList.push(component);
      componentMap[component.key] = component;
    },
    componentList,
    componentMap,
  };
}
export let registerConfig = createCanvasConfig();

// 物料属性
const createInputProp = (label: String) => ({ type: "input", label });
const createColorProp = (label: String) => ({ type: "color", label });
const createSelectProp = (label: String, options: any) => ({
  type: "select",
  label,
  options,
});

// 流程
registerConfig.register({
  label: "流程",
  preview: () =>
    defineComponent({
      template: `<div ref="processRef"></div>`,
      setup() {
        //获取元素
        const processRef: any = ref(null);

        //添加子元素
        const addChildElement = () => {
          // 创建 Canvas 元素
          const canvas = document.createElement("canvas");
          canvas.width = 100;
          canvas.height = 50;

          // 创建 Canvas 上下文对象
          const context = createCanvasContext(canvas);

          // 创建流程节点实例
          const processNode = new ProcessNode(context);
          processNode.draw(0, 0, 100, 50, "Process");

          processRef.value.appendChild(canvas);
        };

        onMounted(() => {
          addChildElement();
        });

        return {
          processRef,
        };
      },
    }),
  render: (prop) =>
    useCreateBlock(prop, ProcessNode, { width: 100, height: 50 }),
  key: "process",
  props: {
    text: createInputProp("文本内容"),
    color: createColorProp("字体颜色"),
    size: createSelectProp("字体大小", [
      { label: "14px", value: "14px" },
      { label: "20px", value: "20px" },
      { label: "24px", value: "20px" },
    ]),
  },
});

// 开始或结束
registerConfig.register({
  label: "开始或结束",
  preview: () =>
    defineComponent({
      template: `<div ref="startRef"></div>`,
      setup() { 
        //获取元素
        const startRef: any = ref(null);

        //添加子元素
        const addChildElement = () => {
          // 创建 Canvas 元素
          const canvas = document.createElement("canvas");
          canvas.width = 100;
          canvas.height = 50;

          // 创建 Canvas 上下文对象
          const context = createCanvasContext(canvas);

          // 创建流程节点实例
          const startNode = new StartNode(context);
          startNode.draw(0, 0, 100, 50, 32, "Start");

          startRef.value.appendChild(canvas);
        };

        onMounted(() => {
          addChildElement();
        });

        return {
          startRef,
        };
      },
    }),
  render: (prop) =>
    useCreateBlock(prop, StartNode, {
      width: 100,
      height: 50,
      borderRadius: 32,
    }),
  key: "start-or-end",
  props: {
    text: createInputProp("文本内容"),
    color: createColorProp("字体颜色"),
    size: createSelectProp("字体大小", [
      { label: "14px", value: "14px" },
      { label: "20px", value: "20px" },
      { label: "24px", value: "20px" },
    ]),
  },
});

// 判定
registerConfig.register({
  label: "判定",
  preview: () =>
    defineComponent({
      template: `<div ref="decisionRef"></div>`,
      setup() {
        //获取元素
        const decisionRef: any = ref(null);

        //添加子元素
        const addChildElement = () => {
          // 创建 Canvas 元素
          const canvas = document.createElement("canvas");
          canvas.width = 100;
          canvas.height = 50;

          // 创建 Canvas 上下文对象
          const context = createCanvasContext(canvas);

          // 创建流程节点实例
          const decisionNode = new DecisionNode(context);
          decisionNode.draw(0, 0, 100, 50, "decision", [""]);

          decisionRef.value.appendChild(canvas);
        };

        onMounted(() => {
          addChildElement();
        });

        return {
          decisionRef,
        };
      },
    }),
  render: (prop) =>
    useCreateBlock(prop, DecisionNode, {
      width: 100,
      height: 50,
    }),
  key: "decision",
  props: {
    text: createInputProp("文本内容"),
    color: createColorProp("字体颜色"),
    size: createSelectProp("字体大小", [
      { label: "14px", value: "14px" },
      { label: "20px", value: "20px" },
      { label: "24px", value: "20px" },
    ]),
  },
});

// 手动操作
registerConfig.register({
  label: "手动操作",
  preview: () =>
    defineComponent({
      template: `<div ref="manualRef"></div>`,
      setup() {
        //获取元素
        const manualRef: any = ref(null);

        //添加子元素
        const addChildElement = () => {
          // 创建 Canvas 元素
          const canvas = document.createElement("canvas");
          canvas.width = 100;
          canvas.height = 50;

          // 创建 Canvas 上下文对象
          const context = createCanvasContext(canvas);

          // 创建流程节点实例
          const manualNode = new ManualOperationNode(context);
          manualNode.draw(0, 0, 100, 50, "option");

          manualRef.value.appendChild(canvas);
        };

        onMounted(() => {
          addChildElement();
        });

        return {
          manualRef,
        };
      },
    }),
  render: (prop) =>
    useCreateBlock(prop, ManualOperationNode, {
      width: 100,
      height: 50,
    }),
  key: "manual-opation",
  props: {
    text: createInputProp("文本内容"),
    color: createColorProp("字体颜色"),
    size: createSelectProp("字体大小", [
      { label: "14px", value: "14px" },
      { label: "20px", value: "20px" },
      { label: "24px", value: "20px" },
    ]),
  },
});

// 圆弧流程
registerConfig.register({
  label: "圆弧流程",
  preview: () =>
    defineComponent({
      template: `<div ref="arcProcessRef"></div>`,
      setup() {
        //获取元素
        const arcProcessRef: any = ref(null);

        //添加子元素
        const addChildElement = () => {
          // 创建 Canvas 元素
          const canvas = document.createElement("canvas");
          canvas.width = 100;
          canvas.height = 60;

          // 创建 Canvas 上下文对象
          const context = createCanvasContext(canvas);

          // 创建流程节点实例
          const arcProcessNode = new ArcProcessNode(context);
          arcProcessNode.draw(0, 5, 100, 50, 10, "arcProcess");

          arcProcessRef.value.appendChild(canvas);
        };

        onMounted(() => {
          addChildElement();
        });

        return {
          arcProcessRef,
        };
      },
    }),
  render: (prop) =>
    useCreateBlock(prop, ArcProcessNode, {
      width: 100,
      height: 50,
      cornerRadius: 10,
    }),
  key: "arc-process",
  props: {
    text: createInputProp("文本内容"),
    color: createColorProp("字体颜色"),
    size: createSelectProp("字体大小", [
      { label: "14px", value: "14px" },
      { label: "20px", value: "20px" },
      { label: "24px", value: "20px" },
    ]),
  },
});

// 开始
registerConfig.register({
  label: "开始",
  preview: () =>
    defineComponent({
      template: `<div ref="circleRef"></div>`,
      setup() {
        //获取元素
        const circleRef: any = ref(null);

        //添加子元素
        const addChildElement = () => {
          // 创建 Canvas 元素
          const canvas = document.createElement("canvas");
          canvas.width = 100;
          canvas.height = 60;

          // 创建 Canvas 上下文对象
          const context = createCanvasContext(canvas);

          // 创建流程节点实例
          const circleNode = new CircleNode(context);
          circleNode.draw(20, 0, 30, "circle");

          circleRef.value.appendChild(canvas);
        };

        onMounted(() => {
          addChildElement();
        });

        return {
          circleRef,
        };
      },
    }),
  render: (prop) =>
    useCreateBlock(prop, CircleNode, {
      width: 60,
      height: 60,
      radius: 30,
    }),
  key: "start",
  props: {
    text: createInputProp("文本内容"),
    color: createColorProp("字体颜色"),
    size: createSelectProp("字体大小", [
      { label: "14px", value: "14px" },
      { label: "20px", value: "20px" },
      { label: "24px", value: "20px" },
    ]),
  },
});
