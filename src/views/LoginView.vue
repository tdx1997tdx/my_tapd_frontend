<template>
  <div class="login_container">
    <div class="login_box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: "LoginView",
  data() {
    return {};
  },
  methods: {},
  components: {}
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
