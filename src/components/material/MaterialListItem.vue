<template>
  <div class="item" draggable="true">
    <component :is="PreviewComponent" class="flowChart-item"></component>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
const props = defineProps(["item"]);

//获取render函数
const PreviewComponent = props.item.preview();

</script>

<style scoped lang="scss">

.item {
    margin: 5px;

    span {
        display: none;
    }

    .flowChart-item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        
        canvas {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
