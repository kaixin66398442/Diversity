<template>
  <!-- 工作台顶部 -->
  <div class="editor-top nav">
    <!-- 上层工具区 -->
    <div class="tab-tool">
      <!-- 工具区左侧 -->
      <div class="tool-left">
        <!-- 左侧上层 -->
        <div class="tabs-topbar">
          <div class="tabs-left">
            <div class="topbar-back">
              <SvgIcon
                name="topbar-back"
                width="22px"
                height="22px"
                color="#666"
              ></SvgIcon>
            </div>
            <div class="topbar-options">
              <div class="rename">
                <span class="edit-box">未命名文件</span>
              </div>
              <!-- 保存按钮 -->
              <div class="save tabs-icon">
                <SvgIcon name="save" color="#000"></SvgIcon>
              </div>
              <!-- 导出按钮 -->
              <div class="export tabs-icon">
                <SvgIcon name="export" color="#000"></SvgIcon>
              </div>
              <!-- 收藏按钮 -->
              <div class="star tabs-icon">
                <SvgIcon name="star" color="#424242"></SvgIcon>
              </div>
              <!-- <SvgIcon name="star-fill" color="#424242"></SvgIcon>
                <SvgIcon name="star-click"></SvgIcon> -->
            </div>
          </div>
        </div>
        <!-- 左侧下层 -->
        <div class="tabs-layer">
          <div class="tabs-left">
            <!-- 菜单按钮盒子 -->
            <div class="menu-btn-box">
              <div class="menu-btn">文件</div>
              <div class="menu-btn">编辑</div>
              <div class="menu-btn">选择</div>
              <div class="menu-btn">插入</div>
              <div class="menu-btn">布局</div>
              <div class="menu-btn">视图</div>
              <div class="menu-btn">符号</div>
            </div>
          </div>
        </div>
      </div>
      <div class="tool-right"></div>
    </div>
    <!-- 下层编辑区 -->
    <div class="tab-edit">
      <!-- 左侧编辑区 -->
      <div class="left">
        <!-- 右箭头 -->
        <SvgIcon
          name="arrow-right"
          width="30"
          height="30"
          class="svg"
          v-if="!store.material.isShowMaterial"
          @click="store.material.isShowMaterial = true"
        ></SvgIcon>
        <!-- 撤销 -->
        <SvgIcon
          name="undo"
          width="18"
          height="18"
          class="svg"
          @click="commands.undo()"
        ></SvgIcon>

        <!-- 重做 -->
        <SvgIcon
          name="redo"
          width="18"
          height="18"
          class="svg"
          @click="commands.redo()"
        ></SvgIcon>

        <!-- 格式刷 -->
        <SvgIcon
          name="format-painter"
          width="18"
          height="18"
          class="svg"
        ></SvgIcon>

        <!-- 字体选择 -->
        <el-select
          v-model="fontType"
          placeholder="Select"
          class="font-type-select"
        >
          <el-option
            v-for="item in fontTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <!-- 字号选择 -->
        <el-select
          v-model="fontSize"
          placeholder="Select"
          class="font-size-select"
        >
          <el-option
            v-for="item in fontSizeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <!-- 加粗 -->
        <SvgIcon name="bold" width="18" height="18" class="svg"></SvgIcon>

        <!-- 斜体 -->
        <SvgIcon name="italic" width="18" height="18" class="svg"></SvgIcon>

        <!-- 下划线 -->
        <SvgIcon name="underline" width="18" height="18" class="svg"></SvgIcon>

        <!-- 文本颜色 -->
        <SvgIcon name="text-color" width="22" height="22" class="svg"></SvgIcon>
      </div>
      <!-- 右侧编辑区 -->
      <div class="right">
        <!-- 收缩展开 -->
        <SvgIcon
          name="folded"
          width="22"
          height="22"
          class="svg"
          v-if="store.operator.isShowOperator"
          @click="store.operator.isShowOperator = false"
        ></SvgIcon>
        <SvgIcon
          name="unfolded"
          width="22"
          height="22"
          class="svg"
          v-if="!store.operator.isShowOperator"
          @click="store.operator.isShowOperator = true"
        ></SvgIcon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, inject } from "vue";
import { useStore } from "@/store";
import { useFocus } from "@/hook/useFocus";
import { useCommand } from "@/hook/useCommand";
import { Data } from "@/type/data";

const store = useStore();

//字体类型
const fontType = ref("微软雅黑");
const fontTypeOptions = [
  {
    value: "微软雅黑",
    label: "微软雅黑",
  },
  {
    value: "黑体",
    label: "黑体",
  },
  {
    value: "宋体",
    label: "宋体",
  },
  {
    value: "华文楷体",
    label: "华文楷体",
  },
  {
    value: "华文行楷",
    label: "华文行楷",
  },
];

//字体大小
const fontSize = ref(11);
const fontSizeOptions = [
  {
    value: 6,
    label: "6",
  },
  {
    value: 7,
    label: "7",
  },
  {
    value: 8,
    label: "8",
  },
  {
    value: 9,
    label: "9",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 11,
    label: "11",
  },
  {
    value: 12,
    label: "12",
  },
  {
    value: 14,
    label: "14",
  },
  {
    value: 16,
    label: "16",
  },
  {
    value: 18,
    label: "18",
  },
  {
    value: 20,
    label: "20",
  },
];

//data.json的数据
const data: Data = inject("data")!;

const { focusData } = useFocus(data, () => {});

//按钮功能映射
const { commands } = useCommand(data, focusData);
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;

  // 上层工具区
  .tab-tool {
    height: 55px;
    display: flex;
    justify-content: space-between;
    background: #eef0f5;

    .tool-left {
      flex: 1 1 auto;
      height: 63px;

      // 左侧上层
      .tabs-topbar {
        position: relative;
        height: 32px;
        background-color: transparent;
        display: flex;
        justify-content: space-between;

        .tabs-left {
          display: flex;

          // 回退按钮
          .topbar-back {
            width: 30px;
            padding-left: 10px;
            font-size: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
            cursor: pointer;
            opacity: 0.8;
          }

          // 回退按钮后面几个功能选项
          .topbar-options {
            position: relative;
            margin: 0 auto;
            display: flex;
            align-items: center;

            // 可以重命名的盒子
            .rename {
              color: #000;
              padding: 0;
              max-width: 400px;
              min-width: 87px;
              border: unset;
              height: 32px;
              text-overflow: ellipsis;
              white-space: nowrap;
              opacity: 0.8;

              .edit-box {
                display: block;
                line-height: 32px;
                color: $base-text-color;
                font-size: 12px;
                width: 100%;
                height: 100%;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                user-select: none;
                cursor: pointer;

                &:hover {
                  color: #000;
                }
              }
            }

            .tabs-icon {
              width: 30px;
              padding-left: 10px;
              font-size: 14px;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-right: 10px;
              cursor: pointer;
              opacity: 0.8;
            }
          }
        }
      }

      // 左侧下层
      .tabs-layer {
        user-select: none;
        color: #333;
        width: 100%;
        height: 24px;
        position: relative;
        display: flex;
        white-space: nowrap;
        justify-content: space-between;

        .tabs-left {
          display: flex;
          user-select: none;
          text-align: center;
          font-size: 14px;
          margin-left: 10px;

          .menu-btn-box {
            display: flex;
            flex-wrap: nowrap;

            //   里面的菜单按钮
            .menu-btn {
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
        }
      }
    }

    .tool-right {
      display: flex;
      align-items: center;
      padding-right: 10px;
      width: 367px;
    }
  }

  // 下层编辑区
  .tab-edit {
    display: flex;
    justify-content: space-between;
    height: 45px;
    background-color: #fff;

    // 左侧编辑区
    .left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 20px;
    }
    // 右侧编辑区
    .right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 5px;
    }

    .svg {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      border-radius: 6px;
      transition: all 0.2s ease;
      cursor: pointer;
      margin: 0 6px;
    }

    .svg:hover {
      background-color: #e7e7e7;
    }

    // 字体类型
    .font-type-select {
      width: 120px;
      margin: 0 6px;
    }

    //字体大小
    .font-size-select {
      width: 60px;
      margin: 0 6px;
    }
  }
}
</style>
