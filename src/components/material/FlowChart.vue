<template>
    <div class="flowchart" ref="flowchartRef"></div>
</template>
  
<script setup lang="ts">
import { Data } from '@/type/data';
import { Graph } from '@antv/x6';
// import { GridLayout } from '@antv/layout'  // umd模式下， const { GridLayout } = window.layout
import { Stencil } from '@antv/x6-plugin-stencil'
import { onMounted, ref, nextTick, watch, inject, reactive } from 'vue';

const data: Data = inject("data")!;

//物料data
const materialData: any = reactive({});


const props = defineProps({
    materialWidth: {
        type: Number,
        required: true
    }
});
const flowchartRef: any = ref(null)
const graph: any = ref(null);

onMounted(() => {
    initMaterial()
})

//初始化material画布
const initMaterial = () => {
    nextTick(() => {
        const container = flowchartRef?.value;
        if (container) {
            setTimeout(() => {
                const rect = container.getBoundingClientRect();
                const width = rect.width;
                const height = rect.height;
                // graph.value = new Graph({
                //     container,
                //     width,
                //     height,
                //     background: {
                //         color: '#fff', // 设置画布背景颜色
                //     },
                //     grid: {
                //         size: 10,      // 网格大小 10px
                //         visible: true, // 渲染网格背景
                //     },
                //     autoResize: true,
                //     panning: {
                //         enabled: false,
                //     },
                // });
                // graph?.value?.fromJSON(data)


                const stencil = new Stencil({
                    title: '左侧流程图物料',
                    target: graph,
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
                    collapsable: true
                })

                // 需要一个容纳 stencil 的 Dom 容器 stencilContainer
                flowchartRef?.value.appendChild(stencil.container)
                stencil.load(data.nodes, '基本流程图')
                stencil.load(data.nodes, '基本图形')

            }, 20);

        }
    });
}


watch(props, () => {
    console.log('--------', graph.value)
});


</script>
  
<style lang="scss" scoped>
.flowchart {
    width: 100%;
    height: 400px;
    background: rgb(234, 236, 234);
}
</style>