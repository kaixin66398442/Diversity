<template>
  <!-- 左侧物料库 -->
  <div class="editor-left material-list" v-if="store.material.isShowMaterial">
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
        ></SvgIcon>
      </div>
    </div>

    <!-- 物料内容区域 -->
    
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";

const store = useStore();

interface Tree {
  label: string
  children?: Tree[]
}

const handleNodeClick = (data: Tree) => {
  console.log(data)
}

const data: Tree[] = [
  {
    label: '我的收藏',
    children: [
      {
        label: 'Level two 1-1',
      },
    ],
  },
  {
    label: '文本',
    children: [
      {
        label: 'Level two 2-1',
      },
      {
        label: 'Level two 2-2',
      },
    ],
  },
  {
    label: '基本绘图形状',
    children: [
      {
        label: 'Level two 3-1',
      },
      {
        label: 'Level two 3-2',
      },
    ],
  },
  {
    label: '基本基本流程图形状',
    children: [
      {
        label: 'Level two 3-1',
      },
      {
        label: 'Level two 3-2',
      },
    ],
  },
]

const defaultProps = {
  children: 'children',
  label: 'label',
}
</script>

<style lang="scss" scoped>
.material-list {
  width: 250px;
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
}
</style>
