<template>
  <div class="canvas-list" @mousedown.stop="containerMousedown($event)">
    <CanvasListItem
      v-for="(block, index) in data.blocks"
      :id="'block' + index"
      :index="index"
      :block="block"
      @mousedown.stop="blockMousedown($event, block, index)"
      @contextmenu="onContextMenuBlock($event)"
    >
      <template v-slot:node-anchor>
        <!-- 4个连接点的位置，瞄点 -->
        <div
          v-if="true"
          v-for="(item, idx) in nodeAnchor"
          :key="idx"
          :class="`node-anchor ${item}`"
        ></div>
      </template>
    </CanvasListItem>

    <!-- 纵向参考线 -->
    <div
      class="line-x"
      v-if="markLine.x"
      :style="{ left: markLine.x + 'px' }"
    ></div>
    <!-- 横向参考线 -->
    <div
      class="line-y"
      v-if="markLine.y"
      :style="{ top: markLine.y + 'px' }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import {
  inject,
  watch,
  onMounted,
  reactive,
  toRefs,
  watchEffect,
  nextTick,
} from "vue";
import { Data, Block } from "@/type/data";
import { useStore } from "@/store";
import { useFocus } from "@/hook/useFocus";
import { useDrag } from "@/hook/useDrag";
import { useCommand } from "@/hook/useCommand";
import { createComponent } from "@/hook/createVNode";
import { GenNonDuplicateID } from "@/hook/until"; //引入生成随机数
import jsPlumb from "jsplumb";
//jsplumb配置
import {
  jsplumbSetting,
  jsplumbConnectOptions,
  jsplumbSourceOptions,
  jsplumbTargetOptions,
} from "@/hook/commonConfig";

const store = useStore();

//引入data
const data: Data = inject("data")!;

//点击选中画布的block
const { focusData, lastSelectBlock, blockMousedown, containerMousedown } =
  useFocus(data, (e: any) => mouseDown(e));

//选中拖拽画布的block
const { mouseDown, markLine } = useDrag(focusData, lastSelectBlock, data);

//按钮操作
const { commands } = useCommand(data, focusData);

//右键点击出现菜单栏
const onContextMenuBlock = (e: MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();

  //调用函数，动态创建组件
  createComponent(e, commands, store.canvas.canvasRef);
};

//监听lastSelectBlock,更新store.lastSelectBlock
watch(lastSelectBlock, (newval) => {
  store.canvas.lastSelectBlock = newval;
});

let $jsPlumb = jsPlumb.jsPlumb;
//缓存实例化的jsplumb对象
let jsPlumb_instance: any = null;

//定义类型
interface LineList {
  from?: string;
  to?: string;
  label?: string;
  id?: string;
  Remark?: string;
}

interface JsPlumbData {
  jsplumbSettingConfig: any;
  jsplumbConnectOptionsConfig: any;
  jsplumbSourceOptionsConfig: any;
  jsplumbTargetOptionsConfig: any;
  nodeList: any[];
  lineList: LineList[];
  nodeAnchor: string[];
}

//jsPlumb配置数据
const jsPlumbData: JsPlumbData = reactive({
  jsplumbSettingConfig: jsplumbSetting,
  jsplumbConnectOptionsConfig: jsplumbConnectOptions,
  jsplumbSourceOptionsConfig: jsplumbSourceOptions,
  jsplumbTargetOptionsConfig: jsplumbTargetOptions,
  nodeList: [],
  lineList: [],
  nodeAnchor: ["anchor-top", "anchor-bottom", "anchor-left", "anchor-right"],
});

const {
  nodeList, //节点数据
  lineList, //连线数组
  nodeAnchor,
  jsplumbTargetOptionsConfig,
  jsplumbSourceOptionsConfig,
  jsplumbConnectOptionsConfig,
  jsplumbSettingConfig,
} = toRefs(jsPlumbData);

onMounted(() => {
  jsPlumb_instance = $jsPlumb.getInstance();

  nodeList.value = data.blocks.map((node: Block, idx: number) => {
    return {
      id: `node${idx}`,
      ...node,
    };
  });

  nextTick(() => {
    //因为jsplimb要在dom元素加载之后才能执行，因为他的原理是找到你绑定的画布dom去渲染svg数据，所以必须得画布dom已经渲染之后才能初始化
    init();
  });

  // jsPlumb.ready(function () {
  //   let common = {
  //     isSource: true,
  //     isTarget: true,
  //     connector: "Flowchart",
  //     endpoint: "Dot",
  //     paintStyle: {
  //       fill: "white",
  //       outlineStroke: "black",
  //       strokeWidth: 2,
  //     },
  //     hoverPaintStyle: {
  //       outlineStroke: "lightgray",
  //     },
  //     connectorStyle: {
  //       outlineStroke: "black",
  //       strokeWidth: 1,
  //     },
  //     connectorHoverStyle: {
  //       strokeWidth: 1,
  //     },
  //   };
  //   jsPlumb.bind("click", (conn, originalEvent) => {
  //     console.log(conn, "conn");
  //     console.log(originalEvent, "originalEvent");
  //   });
  //   data.blocks.forEach((_, index: number) => {
  //     jsPlumb.addEndpoint(
  //       `block${index}`,
  //       {
  //         anchors: ["Left"],
  //       },
  //       common
  //     );
  //     jsPlumb.addEndpoint(
  //       `block${index}`,
  //       {
  //         anchors: ["Right"],
  //       },
  //       common
  //     );
  //     jsPlumb.addEndpoint(
  //       `block${index}`,
  //       {
  //         anchors: ["Top"],
  //       },
  //       common
  //     );
  //     jsPlumb.addEndpoint(
  //       `block${index}`,
  //       {
  //         anchors: ["Bottom"],
  //       },
  //       common
  //     );
  //     jsPlumb.draggable(`block${index}`);
  //     jsPlumb.makeSource(`block${index}`, {
  //       endpoint: "Dot",
  //       anchor: "Continuous",
  //     });
  //   });
  // });
});

//初始化
const init = () => {
  //ready监听jsplumb是否实例化，当jsplumb实例化执行ready内的方法，
  jsPlumb_instance.ready(() => {
    //给jsplumb设置一些默认值
    jsPlumb_instance.importDefaults(jsplumbSettingConfig.value);
    loadEasyFlow();
    // 会使整个jsPlumb立即重绘。
    jsPlumb_instance.setSuspendDrawing(false, true);
  });
};

//加载流程图-初始化节点，使节点可以拖拽
const loadEasyFlow = () => {
  // 初始化节点
  nodeList.value.forEach((node: any) => {
    // console.log("node:", node.id);
    // console.log(
    //   "jsplumbSourceOptionsConfig.value:",
    //   jsplumbSourceOptionsConfig.value
    // );
    console.log("jsPlumb_instance:", jsPlumb_instance);
    // 设置源点，可以拖出线连接其他节点
    // jsPlumb_instance.makeSource(node.id, jsplumbSourceOptionsConfig.value);
    // // 设置目标点，其他源点拖出的线可以连接该节点
    jsPlumb_instance.makeTarget(node.id, jsplumbTargetOptionsConfig.value);
    //画布节点添加拖拽方法
    // draggableNode(node.id);

    // jsPlumb_instance.unbind("connection"); //取消连接事件
    // lineList.value.forEach((_, idx: number) => {
    //   let line: any = jsPlumbData.lineList[idx];
    //   jsPlumb_instance.connect(
    //     {
    //       source: line?.from,
    //       target: line?.to,
    //     },
    //     jsplumbConnectOptionsConfig.value
    //   );
    // });

    // // 连线;
    // jsPlumb_instance.bind("connection", (evt: any) => {
    //   console.log(evt);
    //   console.log("连线");

    //   let from = evt.source.id;
    //   let to = evt.target.id;
    //   lineList.value.push({
    //     from: from,
    //     to: to,
    //     label: "", //连线名称
    //     id: GenNonDuplicateID(8),
    //     Remark: "",
    //   });
    // });
  });
};

//给画布节点添加拖拽方法
const draggableNode = (nodeId: string) => {
  console.log("nodeId:", nodeId);
  // jsPlumb_instance.draggable(nodeId, {
  //   grid: [5, 5],
  //   containment: "center",
  //   drag: (event: any) => {
  //     window.event
  //       ? (window.event.cancelBubble = true)
  //       : event.stopPropagation();
  //     return false;
  //   },
  //   stop: (event: any) => {
  //     let nodeIndex = nodeList.value.findIndex((x) => x.id === nodeId);
  //     Object.assign(nodeList.value[nodeIndex], {
  //       x: event.pos[0],
  //       y: event.pos[1],
  //     });
  //   },
  // });
};
</script>

<style scoped lang="scss">
.canvas-list {
  position: relative;
  width: 100%;
  height: 100%;

  // 移动left
  .line-x {
    position: absolute;
    top: 0;
    bottom: 0;
    border-left: 2px dashed rgb(157, 224, 240);
  }

  // 移动top
  .line-y {
    position: absolute;
    left: 0;
    right: 0;
    border-top: 2px dashed rgb(157, 224, 240);
  }

  .node-anchor {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid rgb(157, 224, 240);
    z-index: 333;
  }
  .anchor-top {
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
  }
  .anchor-bottom {
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
  }
  .anchor-right {
    top: 50%;
    right: -12px;
    transform: translateY(-50%);
  }
  .anchor-left {
    top: 50%;
    left: -12px;
    transform: translateY(-50%);
  }
}
</style>
