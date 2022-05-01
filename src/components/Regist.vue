<template>
  <el-form :model="formData" ref="formData" label-width="0px" class="form_box" :rules="rules">
    <el-form-item>
      <h1 style="margin: 0 auto; text-align: center">新用户注册</h1>
    </el-form-item>
    <el-form-item prop="username">
      <el-input placeholder="请输入用户名" v-model="formData.username" prefix-icon="el-icon-search"/>
    </el-form-item>
    <el-form-item prop="password">
      <el-input placeholder="请输入密码" v-model="formData.password" prefix-icon="el-icon-lock" show-password/>
    </el-form-item>
    <el-form-item prop="recheckPassword">
      <el-input placeholder="确认密码" v-model="formData.recheckPassword" prefix-icon="el-icon-lock" show-password/>
    </el-form-item>
    <el-form-item style="float: right">
      <el-button type="primary" @click="submitForm('formData')">注册</el-button>
      <el-button type="info" @click="resetForm('formData')">清空</el-button>
      <router-link to="loginItem" style="margin: 10px">返回登录</router-link>
    </el-form-item>
  </el-form>
</template>

<script>
import {regist} from "@/api/api";

export default {
  name: "LoginView",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.formData.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        username: "",
        password: "",
        recheckPassword: ""
      },
      rules: {
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"}
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"}
        ],
        recheckPassword: [
          {required: true, message: "请再次确认密码", trigger: "blur"},
          {validator: validatePass2, trigger: "blur"}
        ]
      }
    };
  },
  methods: {
    submitForm: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          regist({
            username: this.formData.username,
            password: this.formData.password
          }).then(res => {
            if (res.code === 0) {
              localStorage.setItem("username", this.formData.username);
              this.$message.success("注册成功");
              this.$router.push("/login/loginItem");
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
