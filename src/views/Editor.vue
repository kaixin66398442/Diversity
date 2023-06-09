<template>
  <div class="editor">
    <Nav></Nav>
    <MaterialList></MaterialList>
    <Operator></Operator>
    <EditorContainer :state="state"></EditorContainer>
  </div>
</template>

<script setup lang="ts">
import Nav from "@/components/nav/Nav.vue";
import MaterialList from "@/components/material/MaterialList.vue";
import Operator from "@/components/operator/Operator.vue";
import EditorContainer from "@/components/container/EditorContainer.vue";
import { reactive } from "vue";
import data from "@/data.json";
const state: any = reactive(data);
</script>

<style scoped>
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
