<template>
  <!-- 左侧物料库 -->
  <div
    class="editor-left material-list"
    v-if="store.material.isShowMaterial"
    :style="{ width: newWidth + 'px' }"
  >
    <!-- 顶部导航栏 -->
    <div class="material-nav">
      <div class="left">
        <!-- 符号库 -->
        <div class="symbol">
          <SvgIcon name="symbol" width="20" height="20" class="svg"></SvgIcon>
          <span>符号库</span>
        </div>
        <div class="arrow-bottom">
          <svgIcon
            name="arrow-bottom"
            width="20"
            height="20"
            class="svg"
          ></svgIcon>
        </div>
      </div>
      <div class="right">
        <SvgIcon name="search" width="24" height="24" class="svg"></SvgIcon>
        <SvgIcon
          name="arrow-left"
          width="24"
          height="24"
          class="svg"
          @click="store.material.isShowMaterial = false"
        >
        </SvgIcon>
      </div>
    </div>

    <!-- 物料内容区域 -->

    <el-tree :data="treeData" :props="defaultProps" class="custom-tree">
      <template #default="{ node, data }">
        <div v-if="data.component" id="basic-flowchart-shapes">
          <MaterialListItem
            v-for="(item, index) in data.componentList"
            :key="index"
            :item="item"
            draggable="true"
            @dragstart="dragstart(item)"
            @dragend="dragend"
          ></MaterialListItem>
        </div>
        <span v-else>{{ node.label }}</span>
      </template>
    </el-tree>

    <!-- 拖拽线条 -->
    <div class="dragline" @mousedown="mouseDown"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, watch } from "vue";
import { useStore } from "@/store";
import { useDragChange } from "@/hook/useDragChange";
import { CreateCanvasConfigResult, Component } from "@/type/canvas";
import MaterialListItem from "@/components/material/MaterialListItem.vue";
import { events } from "@/hook/events";
import { Data } from "@/type/data";

//引入data
const data: Data = inject("data")!;

const store = useStore();

const newWidth = ref(250);

//调用拖拽改变宽度的hook
const { mouseDown } = useDragChange(newWidth, 200, 400);

//物料注册
const config: CreateCanvasConfigResult = inject("config")!;

//获取当前所有的物料列表
const componentList: Component[] = config.componentList;


//被拖拽的物料
let currentComponent: any = null;

//进入元素中，添加一个移动的标识
const dragenter = (e: any) => {
  e.dataTransfer.dropEffect = "move";
};

//在目标元素经过，必须阻止默认行为，否则不能触发drop
const dragover = (e: any) => {
  e.preventDefault();
};

//离开元素的时候，需要增加一个禁用标识
const dragleave = (e: any) => {
  e.dataTransfer.dropEffect = "none";
};

//松手的时候，根据拖拽的组件，添加一个组件
const drop = (e: any) => {
  //拿到当前的物料，将其添加到home组件的data里面
  const current = {
    top: e.offsetY,
    left: e.offsetX,
    zIndex: 1,
    key: currentComponent.key,
    alignCenter: true, //希望拖拽松手时，block居中
    props: {},
  };
  //调用store.updateData方法，将当前拖拽的物料存到data里面
  store.updateData(data, current);
};

const dragstart = (e: any) => {
  //当前拖拽的物料
  currentComponent = e;
  //进去画布后的操作
  store.canvas.canvasRef.addEventListener("dragenter", dragenter);
  store.canvas.canvasRef.addEventListener("dragover", dragover);
  store.canvas.canvasRef.addEventListener("dragleave", dragleave);
  store.canvas.canvasRef.addEventListener("drop", drop);
  //发布start
  events.emit("start");
};

const dragend = () => {
  //离开之后移除事件
  store.canvas.canvasRef.removeEventListener("dragenter", dragenter);
  store.canvas.canvasRef.removeEventListener("dragover", dragover);
  store.canvas.canvasRef.removeEventListener("dragleave", dragleave);
  store.canvas.canvasRef.removeEventListener("drop", drop);
  //发布end
  events.emit("end");
};

//elementplus的物料二级菜单，后续需要改
interface Tree {
  label?: string;
  children?: Tree[];
  component?: boolean;
  componentList?: Component[];
}

const treeData: Tree[] = [
  {
    label: "我的收藏",
    children: [
      {
        label: "子节点1",
      },
    ],
  },
  {
    label: "文本",
    children: [
      {
        label: "Level two 2-1",
      },
      {
        label: "Level two 2-2",
      },
    ],
  },
  {
    label: "基本绘图形状",
    children: [
      {
        label: "Level two 3-1",
      },
      {
        label: "Level two 3-2",
      },
    ],
  },
  {
    label: "基本流程图形状",
    children: [
      {
        component: true,
        componentList: componentList,
      },
    ],
  },
];

const defaultProps = {
  children: "children",
  label: "label",
  component: "component",
  componentList: "componentList",
};
</script>

<style lang="scss" scoped>
.material-list {
  position: relative;
  height: 100%;
  background-color: #f5f5f5;
  z-index: 2;
  border-right: 1px solid rgba(0, 0, 0, 0.06);
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  user-select: none;

  .material-nav {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 45px;
    padding: 0 10px;

    .svg {
      cursor: pointer;
      border-radius: 6px;
      padding: 2px;
      transition: all 0.2s ease;
    }

    .left,
    .right {
      display: flex;
      justify-content: space-between;
      align-self: center;

      .symbol {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 6px;
        padding: 4px;
        margin-right: 10px;
        cursor: pointer;
        transition: all 0.2s ease;

        span {
          margin-left: 10px;
        }
      }

      .svg:hover,
      .symbol:hover {
        background-color: #e7e7e7;
      }

      .arrow-bottom {
        position: absolute;
        top: 9px;
        left: 100px;
        animation: upsidedown 0.6s linear infinite alternate;
      }

      @keyframes upsidedown {
        from {
          top: 9px;
        }

        to {
          top: 13px;
        }
      }
    }
  }

  .custom-tree {
    width: 100%;
    height: 100%;

    :deep(.el-tree-node__content) {
      width: 100%;
      height: auto;
      padding-left: 0 !important;

      .el-icon.el-tree-node__expand-icon.is-leaf {
        display: none;
      }

      #basic-flowchart-shapes {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: space-evenly;
        width: 100%;
      }
    }
  }

  .dragline {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 3px;
    cursor: ew-resize;
  }
}
</style>
