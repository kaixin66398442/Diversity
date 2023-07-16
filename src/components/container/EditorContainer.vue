<template>
  <!-- 中间画布区 -->
  <div class="editor-container">
    <div class="wrapper" ref="wapperRef">
      <!--  这个可以传入图标 -->
      <SketchRule
        :thick="state.thick"
        :scale="store.canvas.scale"
        :width="rulerWidth"
        :height="rulerHeight"
        :start-x="state.startX"
        :start-y="state.startY"
        :shadow="shadow"
        :isShowReferLine="state.isShowReferLine"
        :lines="state.lines"
      >
      </SketchRule>
      <div
        id="screens"
        ref="screensRef"
        @wheel="handleWheel"
        @scroll="handleScroll"
      >
        <div ref="containerRef" class="screen-container">
          <div id="canvas" :style="canvasStyle" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive, onMounted, nextTick, watchEffect } from "vue";

import SketchRule from "vue3-sketch-ruler";
import "vue3-sketch-ruler/lib/style.css";
import { useStore } from "@/store";

const store = useStore();

const props: any = defineProps({
  state: { type: Object },
});

const containerStyles = computed(() => ({
  width: props.state.container.width + "px",
  height: props.state.container.height + "px",
}));

const rectWidth = 600;
const rectHeight = 320;
const screensRef = ref(null);
const containerRef = ref(null);
const wapperRef = ref(null);

//标尺的属性
const state = reactive({
  // scale: 2.5,
  startX: 0,
  startY: 0,
  lines: {
    h: [433, 588],
    v: [33, 143],
  },
  thick: 20,
  isShowRuler: true, // 显示标尺
  isShowReferLine: false, // 显示参考线
});

//标尺的宽高
const rulerWidth = computed(() => wapperRef.value?.offsetWidth - state.thick);
const rulerHeight = computed(() => wapperRef.value?.offsetHeight - state.thick);

const shadow = computed(() => {
  return {
    x: 0,
    y: 0,
    width: rectWidth,
    height: rectHeight,
  };
});

const canvasStyle = computed(() => {
  return {
    width: rectWidth,
    height: rectHeight,
    transform: `scale(${store.canvas.scale})`,
  };
});

onMounted(() => {
  // 滚动居中
  screensRef.value.scrollLeft =
    containerRef.value.getBoundingClientRect().width / 2 - 400;
});

const handleScroll = () => {
  const screensRect = document
    .querySelector("#screens")
    ?.getBoundingClientRect()!;
  const canvasRect = document
    .querySelector("#canvas")
    ?.getBoundingClientRect()!;

  // 标尺开始的刻度
  const startX =
    (screensRect.left + state.thick - canvasRect.left) / store.canvas.scale;
  const startY =
    (screensRect.top + state.thick - canvasRect.top) / store.canvas.scale;
  state.startX = startX;
  state.startY = startY;
};

// 控制缩放值
const handleWheel = (e: {
  ctrlKey: any;
  metaKey: any;
  preventDefault: () => void;
  deltaY: number;
}) => {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault();
    const nextScale = parseFloat(
      Math.max(0.2, store.canvas.scale - e.deltaY / 500).toFixed(2)
    );
    store.canvas.scale = nextScale;
  }
  nextTick(() => {
    handleScroll();
  });
};
</script>

<style lang="scss" scoped>
.editor-container {
  flex: 1;
  position: relative;
  width: 100%;
  height: 92%;
  background-color: #ebebf1;
  border-top: 1px solid rgba(0, 0, 0, 0.06);

  .wrapper {
    position: absolute;
    /* 特别注意,这个width要和传入组件的width成对应关系,
   也就是 780width +thick20 =800
   否则影子不和容器搭配,这个在2X中会进行自动匹配修正,省得配置麻烦
    */
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    border: 1px solid #dadadc;
  }

  #screens {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: auto;

    /* 设置滚动条的样式 */
    &::-webkit-scrollbar {
      width: 12px;
      height: 12px;
      border-radius: 5px;
    }

    /* 滚动槽 */
    &::-webkit-scrollbar-track {
      background-color: #fff;
    }

    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
      width: 20px;
      border-radius: 5px;
      background: #d2d3d4;
      margin: 2px;
    }
  }

  .screen-container {
    position: absolute;
    width: 5000px;
    height: 3000px;
  }

  #canvas {
    position: absolute;
    top: 80px;
    left: 50%;
    width: 300px;
    height: 210px;
    background-color: #fff;
    background-size: 100% 100%;
    transform-origin: 50% 0;
  }
}
</style>
