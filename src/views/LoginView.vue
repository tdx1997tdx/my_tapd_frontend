<template>
  <div class="login_container">
    <div class="login_box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import {report} from "@/api/api";

export default {
  name: "LoginView",
  data() {
    return {};
  },
  methods: {
    isLogin() {
      report().then(res => {
        if (res.code === 0) {
          this.$message.success("登录成功");
          this.$router.push("/home");
        }
      });
    }
  },
  components: {},
  mounted() {
    this.isLogin();
  }
};
</script>

<style scoped>
.login_container {
  width: 100%;
  height: 100%;
  background-image: url('../assets/loginBackgroud.jpg');
  background-position: center center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}

.login_box {
  width: 460px;
  height: 360px;
  background-color: white;
  border-radius: 3px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute
}

</style>
