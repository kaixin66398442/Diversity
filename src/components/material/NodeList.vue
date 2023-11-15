<template>
    <div class="container" ref="containerRef"></div>
</template>
  
<script setup lang="ts">
import { Data } from '@/type/data';
import { Graph } from '@antv/x6';
import { Stencil } from '@antv/x6-plugin-stencil'
import { onMounted, ref, nextTick, watch, inject, reactive } from 'vue';
import { useStore } from '@/store';

const store = useStore();
const data: Data = inject("data")!;

const containerRef: any = ref(null)

const props = defineProps({
    materialWidth: {
        type: Number,
        required: true
    }
});

onMounted(() => {
    initMaterial()
})

//初始化material画布
const initMaterial = () => {
    nextTick(() => {
        const container = containerRef?.value;
        if (container) {
            setTimeout(() => {
                const { width, height } = container.getBoundingClientRect();

                const stencil = new Stencil({
                    title: '左侧流程图物料',
                    target: store.canvas.graph,
                    groups: [
                        {
                            name: '基本流程图',
                        },
                        {
                            name: '基本图形',
                        },
                    ],
                    search: true,
                    placeholder: '请输入搜索的节点',
                    notFoundText: '为匹配到搜索结果',
                    collapsable: true,
                    stencilGraphWidth: width,
                    stencilGraphHeight: height,
                    layoutOptions: {
                        // columns: width / 110,
                        // columnWidth: 110,
                        // rowWidth: 50,
                    },
                })

                // 需要一个容纳 stencil 的 Dom 容器 stencilContainer
                containerRef?.value.appendChild(stencil.container);
                stencil.load(data.nodes, '基本流程图');
                stencil.load(data.nodes, '基本图形');

            }, 20);

        }
    });
}


watch(props, () => {
    const { width, height } = containerRef?.value.getBoundingClientRect();
    // console.log('--------', width, height)
    // console.log('width', props.materialWidth)
    initMaterial();
});


</script>
  
<style lang="scss" scoped>
.container {
    position: relative;
    width: 100%;
    height: 100%;
    background: rgb(234, 236, 234);

    :deep(.x6-graph) {
        width: 100% !important;
    }
}
</style>