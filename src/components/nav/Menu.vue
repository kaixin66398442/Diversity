<template>
  <div class="menu">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
    >
      <el-sub-menu index="0" class="menu-btn">
        <template #title>文件</template>
        <el-menu-item index="0-1">回到首页</el-menu-item>
        <el-menu-item index="0-2"
          >保存&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ctrl+S</el-menu-item
        >
        <el-menu-item index="0-3">另存为</el-menu-item>
        <el-menu-item index="0-4">重命名</el-menu-item>
        <el-menu-item index="0-5">文档加密</el-menu-item>
        <el-menu-item index="0-6">导入数据</el-menu-item>
        <el-sub-menu index="0-7">
          <template #title>导出</template>
          <el-menu-item index="0-4-1" @click="exportToPNG">PNG</el-menu-item>
          <el-menu-item index="0-4-2">PDF</el-menu-item>
          <el-menu-item index="0-4-3">Excel</el-menu-item>
          <el-menu-item index="0-4-4">HTML</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="0-8">分享</el-menu-item>
        <el-menu-item index="0-9">下载</el-menu-item>
        <el-menu-item index="0-10">打印</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="1" class="menu-btn">
        <template #title>编辑</template>
        <el-menu-item index="1-1"
          >撤销&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ctrl+Z</el-menu-item
        >
        <el-menu-item index="1-2"
          >重做&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ctrl+Y</el-menu-item
        >
        <el-menu-item index="1-3"
          >剪切&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ctrl+X</el-menu-item
        >
        <el-menu-item index="1-4"
          >复制&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ctrl+C</el-menu-item
        >
        <el-menu-item index="1-5"
          >粘贴&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ctrl+V</el-menu-item
        >
      </el-sub-menu>

      <el-menu-item index="3" class="menu-btn">选择</el-menu-item>
      <el-menu-item index="4" class="menu-btn">插入</el-menu-item>
      <el-menu-item index="5" class="menu-btn">布局</el-menu-item>
      <el-menu-item index="6" class="menu-btn">视图</el-menu-item>
      <el-menu-item index="7" class="menu-btn">符号</el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import html2canvas from "html2canvas";
import { useStore } from "@/store";

const store = useStore();

const activeIndex = ref("1");

// 导出为PNG格式的图片
const exportToPNG = () => {
  const clientWidth = store.canvas.canvasRef.offsetWidth; // 获取画布宽度
  const clientHeight = store.canvas.canvasRef.offsetHeight; // 获取画布高度
  const kh = [clientWidth, clientHeight]; // 保存宽度和高度的数组

  html2canvas(store.canvas.canvasRef, { useCORS: true, logging: true }).then(
    (canvas) => {
      const dataURL = canvas.toDataURL("image/png"); // 将画布转为DataURL
      download(dataURL, kh); // 下载转换后的图片
    }
  );
};

// 获取指定URL的图像的Base64编码数据URL
const getUrlBase64 = (url: string, kh: number[]) => {
  return new Promise<string>((resolve) => {
    const canvas = document.createElement("canvas"); // 创建画布元素
    const ctx = canvas.getContext("2d")!; // 获取画布的2D渲染上下文
    const img = new Image(); // 创建图像元素
    img.crossOrigin = "Anonymous"; // 设置图像跨域属性为匿名
    img.src = url; // 设置图像元素的源URL

    img.onload = () => {
      canvas.height = kh[1]; // 设置画布的高度
      canvas.width = kh[0]; // 设置画布的宽度
      ctx.drawImage(img, 0, 0, kh[0], kh[1]); // 在画布上绘制图像
      const dataURL = canvas.toDataURL("image/png"); // 将画布转为DataURL
      resolve(dataURL); // 解析Base64编码的数据URL
    };
  });
};

// 下载图片
const download = (imgUrl: string, kh: number[]) => {
  getUrlBase64(imgUrl, kh).then((base64: string) => {
    const link = document.createElement("a"); // 创建下载链接元素
    link.href = base64; // 设置链接的URL为Base64编码
    link.download = `流程图.png`; // 设置下载的文件名
    link.click(); // 触发点击下载链接
  });
};
</script>

<style scoped lang="scss">
.menu {
  :deep(.el-menu) {
    height: 100%;
    background-color: transparent;
  }

  :deep(.menu-btn) {
    position: relative;
    cursor: pointer;
    font-size: 12px;
    user-select: none;
    margin: 0 0;
    padding: 0 18px;
    height: 100%;
    line-height: 24px;
    border-radius: 8px 8px 0 0;

    &:hover {
      background-color: #fff;
    }
  }
}
</style>
