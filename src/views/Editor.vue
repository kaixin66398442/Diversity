<template>
  <div class="editor" @wheel="handlerWheel($event)">
    <Nav></Nav>
    <div id="bottom">
      <MaterialList></MaterialList>
      <EditorContainer :state="state"></EditorContainer>
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
import { reactive } from "vue";
import data from "@/data.json";
import Control from "@/components/control/Control.vue";
const state: any = reactive(data);


//鼠标滚轮事件
const handlerWheel=(e:MouseEvent)=>{
  //判断是不是按下ctrl键,取消去除方法缩小网页的行为
  if(e.ctrlKey){
    e.preventDefault();
  }
}

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
