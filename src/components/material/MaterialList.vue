<template>
  <!-- 左侧物料库 -->
  <div class="editor-left material-list" v-if="ishow"></div>
</template>

<script setup lang="ts">
import { defineProps,ref} from "vue";
//   const props: any = defineProps({
//     state: { type: Object },
//   })
const ishow=ref(true);

</script>

<style lang="scss" scoped>
.material-list {
  width: 250px;
  height: 100%;
  background-color: #f5f5f5;
  z-index: 2;
  border-right: 1px solid rgba(0, 0, 0, 0.06);
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  user-select: none;
}
</style>
