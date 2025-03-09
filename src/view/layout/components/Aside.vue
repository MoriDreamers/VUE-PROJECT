<script setup>
import { MenuConfig } from '../../../config/menu.js'
import { ElNotification, ElSubMenu } from 'element-plus'
import {TrendCharts,StarFilled, } from '@element-plus/icons-vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import { ref } from 'vue';


let countEgg = ref ("0")
const colorEggCount = () =>{
  countEgg.value ++
  if(countEgg.value%5 == 0){
    colorEgg()
  }
}
const colorEgg = () => {
    ElNotification({
    title: '这里是彩蛋！',
    message: 'Ciallo～(∠・ω< )⌒☆',
    type: 'success',
  })
};
</script>

<template>

    <el-aside width="250px" class="el-aside">
      <div class="el-aside-logo">      
        <el-button text @click="colorEggCount" v-model="countEgg">
          HELLO !
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
        <!--可以改成递归，我不用递归的原因不是因为性能开销大，而是单纯因为我不会-->
          <el-sub-menu v-for="menu in MenuConfig()" :key="menu.index" :index="menu.index">
            <template #title>
              <el-icon></el-icon>
              <span>{{ menu.title }}</span>
            </template>
              <template v-if="menu.subMenu">
                <el-sub-menu v-for="subMenu in menu.subMenu" :key="subMenu.index" :index="subMenu.index">
                  <template #title>
                    <el-icon></el-icon>
                    <span>{{ subMenu.title }}</span>
                  </template>
                  <template v-if="subMenu.items">
                    <el-menu-item v-for="item in subMenu.items" :key="subMenu.index" :index="subMenu.index">
                      <template #title>
                        <span>{{ item.title }}</span>
                      </template>
                    </el-menu-item>
                    </template>
                </el-sub-menu>
              </template>
            <template v-else>
              <el-menu-item v-for="item in menu.items" :key="item.index" :index="item.index">
                <template #title>
                  <span>{{ item.title }}</span>
                </template>
              </el-menu-item>
              </template>
          </el-sub-menu>
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
      font-weight: bold;
    }
  }

  .el-menu-vertical-demo {
    width: 100%;
    min-height: calc(100vh - 60px); 
    /*
    减去按钮高度后可以避免出现滚动条 
    */
    border: 0px;
    /*
    自带有一个右边0.8px的边框，会导致有白边不好看，去掉它
    */
  }
</style>