<template>
  <div class="editor" @wheel="handlerWheel($event)">
    <Nav></Nav>
    <div id="bottom">
      <MaterialList></MaterialList>
      <EditorContainer></EditorContainer>
      <Operator></Operator>
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
// 获取仓库
const store = useStore();
// 将data.json的数据保存为响应式数据
const data: Data = reactive(jsonData);

//向子组件提供data
provide("data", data);


//鼠标滚轮事件(阻止用户鼠标缩放行为)
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
@/utils/config@/utils/materialConfig