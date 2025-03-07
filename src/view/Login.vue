<script setup>
import { reactive } from 'vue';
import 'element-plus/theme-chalk/index.css';

import { User,Lock,CoffeeCup, WarnTriangleFilled } from '@element-plus/icons-vue'
import { ref,computed } from 'vue';
import  request from "../api/index.js"
import { apiUrl } from '../config';
import { apiHeader } from '../config';
import { ElMessage } from 'element-plus'

const success = () => {
  ElMessage({
    showClose: true,
    message: '欢迎回家！',
    type: 'success',
    icon:CoffeeCup,
  })
}

const failed = (msg) => {
  ElMessage({
    showClose: true,
    message: msg,
    type: 'error',
    icon:WarnTriangleFilled,
  })
}

const lgi = reactive (
    {
        user:'',
        ps:''
    },
)

// `computed` 会自动响应 `lgi.user` 和 `lgi.ps` 变化
const ban = computed(() => {
    return lgi.ps === "" || lgi.user === "";
});
const submitForm = () => {
    const data = lgi
     request(apiUrl.apiLogin,{
        username:data.user,
        password:data.ps,
    },'post',2000).then((response)=>{ 
        if (response.status === 200){
                success()            
        }else{
               const msg = response.message
                failed(msg)
        }
        const Token = response.data.token 
        window.localStorage.setItem(apiHeader.TokenName, Token)
    })
}
const rules = reactive({
    user: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ],
    ps: [
    { required: true, message: 'Please input Activity password', trigger: 'blur' },
    { min: 5, max: 20, message: 'Length should be 5 to 20', trigger: 'blur' },
  ],
})
</script>

<template>
    <el-card>
        <h1 class="login" style="font-size: 45px" >Please Login</h1>
        <el-form
            style="max-width: 600px"
            :model="lgi"
            class="demo-ruleForm"
            :rules = "rules"
        >
        <el-form-item prop="user">
            <el-input :prefix-icon="User" placeholder="input your username" v-model.number="lgi.user" />
        </el-form-item>
            <el-form-item prop="ps">
            <el-input :prefix-icon="Lock" :show-password="true" v-model="lgi.ps" placeholder="input your password" type="password" autocomplete="off" />
            </el-form-item>
            <el-button :disabled="ban" type="primary" @click="submitForm(lgi)">
                点我
            </el-button>
      </el-form>
      </el-card>
</template>

<style scoped>
    .demo-ruleForm{
        width: 600px;
    }
    
</style>
