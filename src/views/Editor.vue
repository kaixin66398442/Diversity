<template>
  <div class="editor" @wheel="aaa($event)">
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

// window.addEventListener('scroll',(e)=>{
//   console.log(e);
//   console.log(e.target)
// })

const aaa=(e:any)=>{
  console.log('aaaa');
  console.log(e)
}

</script>

<style scoped lang="scss">

#bottom {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #d41a1a;
}

.editor {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
}
</style>
