<template>
  <div class="block" ref="blockRef" :style="blockStyle" :class="props.block.focus ? 'active' : 'block'">
    <component :is="RenderComponent"></component>
  </div>
</template>

<script setup lang="ts">
import { inject,ref,computed ,onMounted,watch} from "vue";
import { CreateCanvasConfigResult } from "@/type/canvas";

//父组件传参
const props = defineProps(["block", "index"]);

//物料注册
const config: CreateCanvasConfigResult = inject("config")!;

const blockStyle = computed(() => {
    return {
        top: props.block.top + 'px',
        left: props.block.left + 'px',
        zIndex: props.block.zIndex
    }
})

//当前拖拽过来的block 
const blockRef = ref(null);

//组件挂载时渲染
onMounted(() => {
    interface CurrentBlock {
        offsetWidth: number;
        offsetHeight: number;
    }
    const currentBlock: CurrentBlock = blockRef?.value!;
    let { offsetWidth, offsetHeight } = currentBlock

    //说明是拖拽松手的时候才渲染的，其他的默认渲染到页面上的内容不需要居中
    if (props.block.alignCenter) {
        props.block.left = props.block.left - offsetWidth / 2;
        props.block.top = props.block.top - offsetHeight / 2;
        props.block.alignCenter = false;//让选然后的结构才能去居中
    }
    props.block.width = offsetWidth;
    props.block.height = offsetHeight;


})


//通过block的key属性直接获取对应的组件
let component = config.componentMap[props.block.key];

//获取render函数
let RenderComponent = component.render(props.block.props);


//监听block的变化更新动态组件
watch(props,(newval)=>{
    component = config.componentMap[newval.block.key];
    RenderComponent = component.render(newval.block.props);
})

</script>

<style scoped lang="scss">
.block {
    position: absolute;
    cursor: pointer;

    
}
.block.active {
        border: 2px dashed rgb(157, 224, 240);
    }

</style>
