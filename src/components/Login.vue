<template>
  <el-form :model="formData" ref="formData" label-width="0px" class="form_box" :rules="rules">
    <el-form-item>
      <h1 style="margin: 0 auto; text-align: center">欢迎来到飞雪测试平台</h1>
    </el-form-item>
    <el-form-item prop="username">
      <el-input placeholder="请输入用户名" v-model="formData.username" prefix-icon="el-icon-search"/>
    </el-form-item>
    <el-form-item prop="password">
      <el-input placeholder="请输入密码" v-model="formData.password" prefix-icon="el-icon-lock" show-password/>
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="formData.isCheck" label="记住密码" size="large"/>
      <router-link to="registItem" style="float: right">用户注册</router-link>
    </el-form-item>
    <el-form-item style="float: right">
      <el-button type="primary" @click="submitForm('formData')">登录</el-button>
      <el-button type="info" @click="resetForm('formData')">清空</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      formData: {
        username: "",
        password: "",
        isCheck: false
      },
      rules: {
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"}
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"}
        ]
      }
    };
  },
  methods: {
    submitForm: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          return false;
        }
      });
    },
    resetForm: function (formName) {
      this.$refs[formName].resetFields();
      this.formData.password = "";
      this.formData.username = "";
    }
  },
  components: {}
};
</script>

<style scoped>

.form_box {
  margin: 30px;
}

</style>
