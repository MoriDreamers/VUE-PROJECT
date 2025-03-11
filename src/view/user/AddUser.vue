<script setup>
  import { toRefs,reactive,ref } from 'vue';
  import {getUserAddApi} from '../../api/user.js'
  import { ElMessage } from 'element-plus'
  const data = reactive({
    userForm:{
      username:"",
      qq:"",
      address:""
    }
  })
  const emits = defineEmits(['refresh'])
//清空表单
  const clearForm = () => {
  userFormRef.value.resetFields()
}
const {userForm} = toRefs(data)
//userFormRef 被用来引用 <el-form> 组件。这样做是为了能够在 JavaScript 中访问和操作这个表单组件
const userFormRef = ref()

const loading = ref(false)
const submitForm = () => {
  loading.value = true;
  getUserAddApi(data.userForm).then((Response) => {
    ElMessage({
        type:'success',
        message:Response.message,
      })
      loading.value = false;
      emits('refresh')
  })

}

</script>

<template>
  <el-form ref="userFormRef" :model="userForm" v-loading="loading" > 
    <el-form-item label="姓名" label-width="60" prop="username" class="form">
      <el-input v-model="userForm.username" autocomplete="off" />
    </el-form-item>
    <el-form-item label="QQ" label-width="60" prop="qq" class="form">
      <el-input v-model="userForm.qq" autocomplete="off" />
    </el-form-item>
    <el-form-item label="地址" label-width="60" prop="address" class="form">
      <el-input v-model="userForm.address" autocomplete="off" />
      </el-form-item>
  </el-form>
  <div class="btn">
    <el-button @click="clearForm">清空</el-button>
    <el-button type="primary" @click="submitForm">
      保存
    </el-button>
  </div>
</template>

<style scoped>
  .btn {
    display: flex;
    justify-content: space-between;
  }
  .form{
    
    width: 440px;
    margin:  10 auto;
  }
</style>