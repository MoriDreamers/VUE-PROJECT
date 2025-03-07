<script setup>
import { reactive, ref } from 'vue';
import 'element-plus/theme-chalk/index.css';

import { User, Lock, CoffeeCup, WarnTriangleFilled } from '@element-plus/icons-vue';
import request from "../api/index.js";
import { apiUrl } from '../config';
import { apiHeader } from '../config';
import { ElMessage } from 'element-plus';

const success = () => {
  ElMessage({
    showClose: true,
    message: '欢迎回家！',
    type: 'success',
    icon: CoffeeCup,
  });
};

const failed = (msg) => {
  ElMessage({
    showClose: true,
    message: msg,
    type: 'error',
    icon: WarnTriangleFilled,
  });
};

const lgi = reactive({
  user: '',
  ps: ''
});

const formRef = ref(null);
const validateUsername = (rule, value, callback) => {
  if (/^\d+$/.test(value)) {
    callback(new Error('Username cannot be a pure number'));
  } else {
    callback();
  }
};
const rules = reactive({
  user: [
    { required: true, message: 'Please input your username and not only numbers ',validator: validateUsername, trigger: 'blur' },
  ],
  ps: [
    { required: true, message: 'Please input your password', trigger: 'blur' },
    { min: 5, max: 20, message: 'Length should be 5 to 20', trigger: 'blur' },
  ],
});

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      const data = lgi;
      request(apiUrl.apiLogin, {
        username: data.user,
        password: data.ps,
      }, 'post', 2000).then((response) => {
        if (response.status === 200) {
          success();
          const Token = response.data.token;
          window.localStorage.setItem(apiHeader.TokenName, Token);
        } else {
          const msg = response.message;
          failed(msg);
        }
      }).catch((error) => {
        failed('Login failed, please try again.');
        console.error('Login error:', error);
      });
    } else {
      failed('Please fill in the form correctly.');
      return false;
    }
  });
};
</script>

<template>
  <el-card>
    <h1 class="login" style="font-size: 45px">Please Login</h1>
    <el-form
      style="max-width: 600px"
      :model="lgi"
      class="demo-ruleForm"
      :rules="rules"
      ref="formRef"
    >
      <el-form-item prop="user">
        <el-input :prefix-icon="User" placeholder="input your username" v-model="lgi.user" />
      </el-form-item>
      <el-form-item prop="ps">
        <el-input :prefix-icon="Lock" :show-password="true" v-model="lgi.ps" placeholder="input your password" type="password" autocomplete="off" />
      </el-form-item>
      <el-button type="primary" @click="submitForm">
        点我
      </el-button>
    </el-form>
  </el-card>
</template>

<style scoped>
.demo-ruleForm {
  width: 600px;
}
</style>