<script setup>
import {TrendCharts} from '@element-plus/icons-vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

</script>

<template>

    <el-aside width="250px" class="el-aside">
      <div class="el-aside-logo">      
        <el-button text>
          Welcome!
        </el-button>
      </div>
      <div class="menu">
          <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
          router
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon ><location /></el-icon>
              <span>用户视图</span>
            </template>
            <el-menu-item index="/user/add">
              <el-icon ><icon-menu /></el-icon>
              <template #title>用户二级菜单</template>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item index="3">
            <el-icon><icon-menu /></el-icon>
            <template #title>Navigator Three</template>
          </el-menu-item>
        </el-menu>
      </div>
    </el-aside>


</template>

<style lang="less" scoped>
  .el-aside {
    box-sizing: border-box;
    width: 250px;
    box-shadow: #221717 0px 0px 15px;
  }
  .el-aside-logo {
    height: 60px;
    width: 100%;
    button{
      width: 100%;
      height: 100%;
      font-size: 18px;
    }
  }

  .el-menu-vertical-demo {
    width: 100%;
    min-height: calc(100vh - 60px); 
    border: 0px;
  }
</style>