<script setup>
import { reactive,ref,markRaw } from 'vue';
import { getUserListApi,getUserDeleteApi } from '../../api/user';
import { toRefs } from 'vue';
import { onBeforeMount } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { CircleCheck } from '@element-plus/icons-vue'
//自定义加载动画，专门留空的几行用于定义动画
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
        `
        
const loading = ref(true)

const data = reactive({
    items:[]
})
const getUserListData = () => {
    getUserListApi().then((Response)=>{
        //调试用：console.log(Response.data.items);
        data.items = Response.data.items;
        loading.value = false;
    })
}
//把items从data中解构出来
const {items} = toRefs(data)
//生命周期的知识点，onBeforeMount是vue3.0新增的生命周期，在组件挂载之前执行
onBeforeMount(()=>{getUserListData()})

const getUserListDelete = (info) => {
    //console.log("当前数据",info)
    ElMessageBox.confirm(
    '正在尝试删除用户，是否继续？',
    '请注意',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
      icon: markRaw(CircleCheck),
    }
  )  .then(() => {
    loading.value = true;
    getUserDeleteApi(info.id).then((Response)=>{
        //调试用：console.log(Response.data.items);
      ElMessage({
        type:'success',
        message:Response.message,
      })
    })
    loading.value = false;
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '用户取消操作',
      })
    })
    
}
</script>

<template>

    <div class="mb-4" style="text-align: left;">
        <el-button @click= "getUserListData " :text="true" style="  text-shadow: #00000069 1px 1px 1px;">添加用户</el-button>
      </div>
      
    <el-table 
    stripe  
    :data="items" 
    style="width: 100%" 
    v-loading="loading"  

    element-loading-text="一二三睦头人..."
    :element-loading-svg="svg"
    class="custom-loading-svg"
    element-loading-svg-view-box="-10, -10, 50, 50"

    >
        <el-table-column prop="username" label="Name" width="120" />
        <el-table-column sortable fixed  prop="id" label="Id" width="70" />
        <el-table-column prop="qq" label="QQ" width="120" />
        <el-table-column prop="address" label="Address" width="600" />
        <el-table-column fixed="right" label="Operations" min-width="103">
          <template #default="scope">
            <el-button link type="warning" size="small">编辑</el-button>
            <el-button @click="getUserListDelete(scope.row)" link type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

</template>