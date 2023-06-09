<template>
    <div>
      <svg :style="{ width, height }">
        <!-- xlink:href 执行哪个图标，属性值务必是 #icon- 加上svg文件的名字 -->
        <!-- fill属性可以设置图标的颜色 -->
        <use :xlink:href="prefix + name" :fill="color"></use>
      </svg>
    </div>
  </template>
  
  <script setup lang="ts">
  // 接收父组件传递过来的参数
  defineProps({
    // xlink:href属性值的前缀
    prefix: {
      type: String,
      default: '#icon-',
    },
    // 提供使用图标的名字
    name: {
      type: String,
      default: 'phone',
    },
    // 颜色
    color: {
      type: String,
      default: '',
    },
    // 宽度
    width: {
      type: String,
      default: '16px',
    },
    // 高度
    height: {
      type: String,
      default: '16px',
    },
  })
  </script>
  
  <style scoped></style>
  