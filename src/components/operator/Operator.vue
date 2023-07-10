<template>
  <!-- 右侧操作区 -->
  <div class="editor-right operator">
    <el-button text @click="table = true"
      >Open Drawer with nested table</el-button
    >
    <el-drawer
      v-model="table"
      title="I have a nested table inside!"
      direction="rtl"
      size="50%"
      model="false"
    >
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElDrawer, ElButton } from 'element-plus'




const table = ref(false)
</script>

<style lang="scss" scoped>
.operator {
  width: 40px;
  height: 100%;
  bottom: 35px;
  background-color: #f5f5f5;
  border-left: 1px solid rgba(0, 0, 0, 0.06);
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  user-select: none;
}
</style>
