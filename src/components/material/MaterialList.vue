<template>
  <!-- 左侧物料库 -->
  <div class="editor-left material-list"></div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
//   const props: any = defineProps({
//     state: { type: Object },
//   })
</script>

<style lang="scss" scoped>
.material-list {
  position: fixed;
  top: 100px;
  left: 0;
  width: 250px;
  bottom: 35px;
  background-color: #f5f5f5;
  z-index: 2;
  border-right: 1px solid rgba(0, 0, 0, 0.06);
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  user-select: none;
}
</style>
