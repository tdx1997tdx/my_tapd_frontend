<template>
  <el-container class="home-container">
    <el-aside :width="asideWidth" class="aside">
      <div class="logo">飞雪</div>
      <el-menu router="true" :collapse="isCollapse" background-color="#545c64" text-color="#fff"
               active-text-color="#ffd04b">
        <div class="toggle-button" @click="toggleClick">|||</div>
        <el-menu-item index="1">
          <el-icon style="margin-right: 10px">
            <platform/>
          </el-icon>
          <span>项目管理</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon style="margin-right: 10px">
            <list/>
          </el-icon>
          <span>文本管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <el-row class="header">
          <el-col :span="20">
            <el-menu router="true" mode="horizontal">
              <el-menu-item index="1">
                <span>项目管理</span>
              </el-menu-item>
              <el-menu-item index="2">
                <span>文本管理</span>
              </el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="2">
            <div class="myLogo"></div>
          </el-col>
          <el-col :span="2">
            <el-menu class="el-menu-demo" mode="horizontal">
              <el-submenu index="2">
                <template #title>{{ username }}</template>
                <el-menu-item index="2-1">个人主页</el-menu-item>
                <el-menu-item @click="logout">登出</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-header>

      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-scrollbar>
          <el-table :data="tableData">
            <el-table-column prop="date" label="Date" width="140"/>
            <el-table-column prop="name" label="Name" width="120"/>
            <el-table-column prop="address" label="Address"/>
          </el-table>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import {defineComponent} from "vue";
import {Platform, List} from "@element-plus/icons-vue";
import {report} from "@/api/api";

export default defineComponent({
  name: "HomeView",
  data() {
    return {
      isCollapse: false,
      asideWidth: "150px",
      username: ""
    };
  },
  methods: {
    toggleClick() {
      this.isCollapse = !this.isCollapse;
      this.asideWidth = this.isCollapse ? "65px" : "150px";
    },
    heartBeat() {
      report().then(res => {
        if (res.code === 10002) {
          this.$message.warning(res.msg);
          this.$router.push("/login/loginItem");
        }
      }).catch(error => {
        this.$message.warning("服务器错误" + error);
        this.$router.push("/login/loginItem");
      });
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
      this.$message.warning("登出成功");
    }
  },
  components: {Platform, List},
  mounted() {
    this.heartBeat();
    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(this.heartBeat, 10000);
    }
    this.username = localStorage.getItem("loginName");
  },
  unmounted() {
    clearInterval(this.timer);
  }
});
</script>

<style scoped>
.logo {
  margin: 0 auto;
  text-align: center;
  line-height: 80px;
  height: 100px;
  font-size: 20px;
  background-color: #545c64;
}

.aside {
  background-color: #545c64
}

.home-container {
  height: 100%;
}


.myLogo {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 50px;
  background-image: url('../assets/logo.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.home-container .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

.toggle-button {
  background-color: grey;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.5em;
  cursor: pointer;
}
</style>
