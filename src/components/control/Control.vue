<template>
  <!-- 底侧控制框 -->
  <div class="editor-bottom control">
    <div class="adaptation">
      <!-- 菜单栏选择控制画布的适配 -->
      <div id="adaptation-dropdown">
        <el-select v-model="value" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <!-- 滑动控制画布的适配 -->
      <div id="adaptation-slider">
        <el-button class="decrease" @click="value--" text>-</el-button>
        <el-slider v-model="value" :max="400" />
        <el-button class="increase" @click="value++" text>+</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from "vue";
import { useStore } from "@/store";

const store = useStore();
const value = ref(0);

//画布的适配参数
const options = [
  {
    value: 102,
    label: "适应宽度",
  },
  {
    value: 62,
    label: "适应页面",
  },
  {
    value: 400,
    label: "400%",
  },
  {
    value: 200,
    label: "200%",
  },
  {
    value: 150,
    label: "150%",
  },
  {
    value: 125,
    label: "125%",
  },
  {
    value: 100,
    label: "100%",
  },
  {
    value: 75,
    label: "75%",
  },
  {
    value: 50,
    label: "50%",
  },
  {
    value: 25,
    label: "25%",
  },
];

//监听value变化，改变store.canvas.scale
watch(value, (newval) => {
  store.canvas.scale = newval / 27.2;
});

//监听store.canvas.scale变化，改变value
watchEffect(() => {
  value.value = Math.round(store.canvas.scale * 27.2);
});
</script>

<style lang="scss" scoped>
.control {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  border-top: 1px solid #e1e1e1;
  background-color: #eef0f5;
  z-index: 9999;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.adaptation {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 100px;

  #adaptation-dropdown {
    display: flex;
    align-items: center;
    width: 100px;
    height: 50px;
    font-size: 16px;
  }

  #adaptation-slider {
    width: 200px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    .decrease,
    .increase {
      width: 24px;
      height: 24px;
      font-size: 20px;
      line-height: 24px;
    }
    .el-slider {
      width: 96px;
      margin: 5px 10px;
    }
  }
}
</style>
