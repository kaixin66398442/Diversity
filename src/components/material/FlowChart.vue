<template>
    <div class="flowchart" ref="flowchartRef"></div>
</template>
  
<script setup lang="ts">
import { Data } from '@/type/data';
import { Graph } from '@antv/x6';
import { GridLayout } from '@antv/layout'  // umd模式下， const { GridLayout } = window.layout
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
                graph.value = new Graph({
                    container,
                    width,
                    height,
                    background: {
                        color: '#fff', // 设置画布背景颜色
                    },
                    grid: {
                        size: 10,      // 网格大小 10px
                        visible: true, // 渲染网格背景
                    },
                    autoResize: true,
                    panning: {
                        enabled: false,
                    },
                });

                const model = {
                    nodes: data.nodes,
                }

                const gridLayout = new GridLayout({
                    type: 'grid',
                    width,
                    height,
                    // condense: true,
                    preventOverlap: true,
                    preventOverlapPadding: 20,
                })

                const newModel = gridLayout.layout(model)
                graph?.value?.fromJSON(newModel)

                // const stencil = new Addon.Stencil({
                //     target: graph,
                //     stencilGraphWidth: width,
                //     stencilGraphHeight: height,
                //     groups: [
                //         {
                //             title: '基础流程图',
                //             name: 'group1',
                //         },
                //     ],
                //     layoutOptions: {
                //         columns: 2,
                //         columnWidth: 80,
                //         rowHeight: 55,
                //     }
                // })
                // container.appendChild(stencil.container)
                // graph?.value?.fromJSON(data)
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