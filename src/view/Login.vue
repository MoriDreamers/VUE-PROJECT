<script setup>
import { reactive } from 'vue';
import 'element-plus/theme-chalk/index.css';

import { User,Lock } from '@element-plus/icons-vue'
const lgi = reactive (
    {
        user:'',
        ps:''
    },
)
</script>

<template>
    <el-card>
        <h1>Please Login</h1>
        <el-form
            style="max-width: 600px"
            :model="lgi"
            class="demo-ruleForm"
        >
        <el-form-item prop="username">
            <el-input :prefix-icon="User" placeholder="input your username" v-model.number="lgi.user" />
        </el-form-item>
            <el-form-item prop="pass">
            <el-input :prefix-icon="Lock" :show-password="true" v-model="lgi.ps" placeholder="input your password" type="password" autocomplete="off" />
            </el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
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
