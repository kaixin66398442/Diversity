<template>
  <!-- 右侧操作区 -->
  <div class="editor-right operator" :class="{ active: store.operator.isShowOperator }"></div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElDrawer, ElButton } from "element-plus";

const table = ref(false);

import { useStore } from "@/store";
const store = useStore();

</script>

<style lang="scss" scoped>
.operator {
  width: 50px;
  height: 100%;
  bottom: 35px;
  background-color: #f5f5f5;
  border-left: 1px solid rgba(0, 0, 0, 0.06);
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  user-select: none;
}
.operator.active {
  width: 200px;
}
</style>
