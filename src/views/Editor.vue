<template>
  <div class="editor" @wheel="handlerWheel($event)">
    <Nav></Nav>
    <div id="bottom">
      <MaterialList></MaterialList>
      <EditorContainer></EditorContainer>
      <Operator v-model="data"></Operator>
    </div>
    <Control></Control>
  </div>
</template>

<script setup lang="ts">
import Nav from "@/components/nav/Nav.vue";
import MaterialList from "@/components/material/MaterialList.vue";
import Operator from "@/components/operator/Operator.vue";
import EditorContainer from "@/components/container/EditorContainer.vue";
import Control from "@/components/control/Control.vue";
import { reactive, provide, watch } from "vue";
import jsonData from "@/data.json";
import type { Data } from "@/type/data";
import { useStore } from "@/store";
const store = useStore();
// data.json的数据
const data: Data = reactive(jsonData);

// 校验页面方向
function checkDirection() {
  if (
    store.operator.canvaDirectionValue === "transverse" &&
    data.container.width < data.container.height
  ) {
    [data.container.width, data.container.height] = [
      data.container.height,
      data.container.width,
    ];
  } else if (
    store.operator.canvaDirectionValue === "vertical" &&
    data.container.width > data.container.height
  ) {
    [data.container.width, data.container.height] = [
      data.container.height,
      data.container.width,
    ];
  }
}

watch(
  () => [store.operator.canvaDirectionValue, store.operator.pageSizeValue],
  () => {
    checkDirection();
  },
  { immediate: true }
);

//向子组件提供data
provide("data", data);


//鼠标滚轮事件
const handlerWheel = (e: MouseEvent) => {
  //判断是不是按下ctrl键,取消去除方法缩小网页的行为
  if (e.ctrlKey) {
    e.preventDefault();
  }
};

//
</script>

<style scoped lang="scss">
#bottom {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.editor {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
