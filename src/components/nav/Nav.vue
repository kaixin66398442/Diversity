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
    <div class="tab-edit"></div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.nav {
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
              padding: 0 20px;
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
    height: 45px;
    display: flex;
    background-color: #fff;
  }
}
</style>
