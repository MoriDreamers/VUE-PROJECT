<script setup>
import { reactive } from 'vue';
import { getUserList } from '../../api/user';
import { toRefs } from 'vue';

const data = reactive({
    items:[]
})
const getUserListData = () => {
    getUserList().then((Response)=>{
        //调试用：console.log(Response.data.items);
        data.items = Response.data.items;
    })
}
//把items从data中解构出来
const {items} = toRefs(data)
getUserListData()
</script>

<template>

    <div class="mb-4" style="text-align: left;">
        <el-button @click= "getUserListData " text="plain" style="  text-shadow: #00000069 1px 1px 1px;">添加用户</el-button>
      </div>
      
    <el-table stripe  :data="items" style="width: 100%"  >
        <el-table-column sortable fixed  prop="id" label="Id" width="70" />
        <el-table-column prop="username" label="Name" width="120" />
        <el-table-column prop="qq" label="QQ" width="120" />
        <el-table-column prop="city" label="City" width="120" />
        <el-table-column prop="address" label="Address" width="600" />
        <el-table-column prop="zip" label="Zip" width="120" />
        <el-table-column fixed="right" label="Operations" min-width="137">
          <template #default>
            <el-button link type="primary" size="small" >详情</el-button>
            <el-button link type="warning" size="small">编辑</el-button>
            <el-button link type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

</template>