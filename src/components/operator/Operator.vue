<template>
  <!-- 右侧操作区 -->
  <div class="editor-right operator"></div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.operator {
  position: fixed;
  top: 100px;
  right: 0;
  width: 40px;
  bottom: 35px;
  background-color: #f5f5f5;
  border-left: 1px solid rgba(0, 0, 0, 0.06);
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  user-select: none;
}
</style>
