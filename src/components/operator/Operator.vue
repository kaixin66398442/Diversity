<template>
  <!-- 右侧操作区 -->
  <div class="editor-right operator" v-if="store.operator.isShowOperator">
    <el-tabs type="border-card" stretch>
      <el-tab-pane label="绘图">
        <!-- 调节页面尺寸 -->
        <div class="page_size">
          <h5 class="title">页面尺寸</h5>
          <el-radio-group v-model="store.operator.pageSizeType">
            <el-radio label="preset" size="large" @change="store.operator.pageSizeType = 'preset'">预设页面大小</el-radio>
            <!-- 预设页面大小 -->
            <el-select v-model="store.operator.pageSizeValue" size="small"
              :disabled="!(store.operator.pageSizeType === 'preset')" @change="presetChange">
              <el-option v-for="ps in store.operator.pageSizeArr" :key="ps.value" :label="ps.label" :value="ps.value" />
            </el-select>
            <el-radio label="custom" size="large" @change="store.operator.pageSizeType = 'custom'">自定义大小</el-radio>
            <!-- 自定义大小 -->
            <div class="custom">
              <el-input-number v-model="data.container.width" :min="1" :max="10000" controls-position="right" size="small"
                :disabled="!(store.operator.pageSizeType === 'custom')" />
              <el-input-number v-model="data.container.height" :min="1" :max="10000" controls-position="right"
                size="small" :disabled="!(store.operator.pageSizeType === 'custom')" />
            </div>
          </el-radio-group>
          <div class="canvas-direction">
            <p>页面方向：</p>
            <el-select v-model="store.operator.canvaDirectionValue" size="small">
              <el-option v-for="cd in store.operator.canvaDirectionArr" :key="cd.value" :label="cd.label"
                :value="cd.value" />
            </el-select>
          </div>
        </div>
        <el-divider />
        <!-- 调整背景网格 -->
        <div class="background_grid">
          <h5 class="title">背景网格</h5>
          <!-- 是否显示网格 -->
          <div class="grid_isShow">
            <p>是否显示网格</p>
            <el-switch v-model="store.operator.isShowGrid" />
          </div>
          <!-- 网格类型 -->
          <div class="grid_type">
            <p>网格类型</p>
            <el-select v-model="store.operator.gridTypeValue" size="small">
              <el-option v-for="(type, index) in store.operator.gridTypeArr" :key="type.value" :label="type.label"
                :value="type.value" />
            </el-select>
          </div>
          <!-- 网格间距 -->
          <div class="grid_spacing">
            <p>网格间距</p>
            <el-slider v-model="store.operator.gridSpacingValue" :max="store.operator.gridSpacingMaxValue"
              :min="store.operator.gridSpacingMinValue" size="small" />
            <div class="value-box">
              {{ store.operator.gridSpacingValue }}
            </div>
          </div>
          <!-- 网格颜色 -->
          <div class="grid_color">
            <p>网格颜色</p>
            <div class="value-box">主</div>
            <el-color-picker v-model="store.operator.gridColorMainValue" size="small" />
            <div class="value-box" style="margin-left: 20px">次</div>
            <el-color-picker v-model="store.operator.gridColorSecondValue" size="small" />
          </div>
          <!-- 背景颜色 -->
          <div class="grid_background_color">
            <p>背景颜色</p>
            <el-color-picker v-model="store.operator.gridBackgroundColorValue" size="small" />
          </div>
        </div>
        <el-divider />
      </el-tab-pane>
      <el-tab-pane label="样式"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, inject } from "vue";
import { useStore } from "@/store";
import { Data } from "@/type/data";

// 获取仓库
const store = useStore();
//接收父组件传来的data
const data: Data = inject("data")!

// 预设页面大小选项的改变
function presetChange() {
  let presetCanvasSize = store.operator.pageSizeValue.split(" ");
  data.container.width = Number(presetCanvasSize[0]);
  data.container.height = Number(presetCanvasSize[1]);
}

</script>

<style lang="scss">
.custom {
  .el-input-number {
    margin-right: 20px;
  }
}

.operator {
  width: 250px;
  height: 100%;
  // bottom: 35px;
  background-color: #f5f5f5;
  user-select: none;

  .title {
    margin-bottom: 15px;
    font-weight: 900;
  }

  .canvas-direction {
    margin-top: 20px;
    display: flex;

    p {
      display: flex;
      align-items: center;
      margin-right: 15px;
      font-size: 12px;
      white-space: nowrap;
    }
  }

  div[class^="grid"] {
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    p {
      margin-right: 15px;
      font-size: 12px;
      white-space: nowrap;
    }

    .value-box {
      margin-left: 5px;
      font-size: 10px;
      text-align: center;
      width: 30px;
      height: 20px;
      line-height: 20px;
      background-color: #f2f2f2;
      border-radius: 5px;
    }
  }

  // 修改某个elementui组件的样式，到控制台看选择器，并且不能设置scoped
  .grid_background_color {
    .el-color-picker--small .el-color-picker__trigger {
      width: 135px;
    }
  }

  // 调整网格间距的后面的有数字的方块
  .value-box input {
    width: 100%;
    margin-left: 2px;
    border: 0;
    background-color: transparent;
  }
}

// 选项卡的高度设置
.el-tabs {
  height: 100%;
}

// 选项卡的高度设置的字体颜色
.el-tabs--border-card>.el-tabs__header .el-tabs__item {
  font-weight: 900;
}

.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
  color: #017fff;
  font-weight: 900;
}

.el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
  color: #017fff;
}

// 调节页面尺寸-自定义大小的两个数字选择器
.el-input-number--small {
  width: 80px;
}

.el-input-number.is-controls-right .el-input__wrapper {
  padding-left: 5px;
  padding-right: 28px;
}
</style>
