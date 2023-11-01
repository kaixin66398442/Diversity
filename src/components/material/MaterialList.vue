<template>
  <!-- 左侧物料库 -->
  <div class="editor-left material-list" v-if="store.material.isShowMaterial" :style="{ width: materialWidth + 'px' }">
    <!-- 顶部导航栏 -->
    <div class="material-nav">
      <div class="left">
        <!-- 符号库 -->
        <div class="symbol">
          <SvgIcon name="symbol" width="20" height="20" class="svg"></SvgIcon>
          <span>符号库</span>
        </div>
        <!-- 向下的会动的箭头 -->
        <div class="arrow-bottom">
          <svgIcon name="arrow-bottom" width="20" height="20" class="svg"></svgIcon>
        </div>
      </div>
      <div class="right">
        <!-- 搜索图标 -->
        <SvgIcon name="search" width="24" height="24" class="svg"></SvgIcon>
        <SvgIcon name="arrow-left" width="24" height="24" class="svg" @click="store.material.isShowMaterial = false">
        </SvgIcon>
      </div>
    </div>

    <!-- 物料内容区域 -->
    <el-tree :data="treeData" :props="defaultProps" class="custom-tree">
      <template #default="{ node, data }">
        <span>{{ node.label }}</span>
      </template>
    </el-tree>

    <!-- 拖拽线条 -->
    <div class="dragline" @mousedown="mouseDown"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed } from "vue";
import { useStore } from "@/store";
import { useDragChange } from "@/hook/useDragChange";
import { Data } from "@/type/data";

// 引入data
const data: Data = inject("data")!;

// 引入仓库
const store = useStore();

// 左侧栏的宽度
const materialWidth = computed({
  get() {
    return store.material.materialWidth;
  },
  set(newValue) {
    store.material.materialWidth = newValue;
  },
});

// 调用拖拽改变宽度的hook
const { mouseDown } = useDragChange(materialWidth, 200, 400);

//elementplus的物料二级菜单，后续需要改
interface Tree {
  label?: string;
  children?: Tree[];
}

// 左侧物料树状数据
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
        label: "Level two 4-1",
      },
      {
        label: "Level two 4-2",
      },
    ],
  },
];

const defaultProps = {
  children: "children",
  label: "label"
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