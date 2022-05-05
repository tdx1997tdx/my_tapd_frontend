<template>
  <el-form :model="formData" ref="formData" label-width="0px" class="form_box" :rules="rules">
    <el-form-item>
      <h1 style="margin: 0 auto; text-align: center">欢迎来到飞雪随笔</h1>
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
import {login} from "@/api/api";

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
          login({
            username: this.formData.username,
            password: this.formData.password
          }).then(res => {
            if (res.code === 0) {
              this.$message.success("登录成功");
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("loginName", this.formData.username);
              localStorage.setItem("userId", res.data.id);
              if (this.formData.isCheck) {
                localStorage.setItem("password", this.formData.password);
              } else {
                localStorage.setItem("password", "");
              }
              this.$router.push("/home");
            } else {
              this.$message.warning(res.msg);
            }
          });
        } else {
          return false;
        }
      }).catch(error => {
        this.$message.warning("服务器错误" + error);
      });
    },
    resetForm: function (formName) {
      this.$refs[formName].resetFields();
      this.formData.password = "";
      this.formData.username = "";
    },
    initForm: function () {
      let username = localStorage.getItem("loginName");
      let password = localStorage.getItem("password");
      if (username) {
        this.formData.username = username;
      }
      if (password) {
        this.formData.password = password;
        this.formData.isCheck = true;
      }
    }
  },
  components: {},
  mounted() {
    this.initForm();
  }
};
</script>

<style scoped>

.form_box {
  margin: 30px;
}

</style>
