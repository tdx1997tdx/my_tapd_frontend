<template>
  <el-container class="home-container">
    <el-aside :width="asideWidth" class="aside">
      <div class="logo"></div>
      <el-menu :collapse="isCollapse" active-text-color="#ffd04b"
               background-color="#545c64"
               class="el-menu-vertical-demo"
               text-color="#fff" v-model="activeMenu.path" :default-active="activeMenu.path">
        <div class="toggle-button" @click="toggleClick">|||</div>
        <el-menu-item :index="menu.path" :value="menu.title" v-for="menu in menuList" :key="menu.path"
                      @click="changeMenu(menu)" v-show="!menu.hidden">
          <el-icon style="margin-right: 10px">
            <component :is="menu.icon"></component>
          </el-icon>
          <span>{{ menu.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <el-row class="header">
          <el-col :span="21">
            <span class="title">飞雪随笔</span>
          </el-col>
          <el-col :span="3">
            <div style="text-align: center;margin:auto;">
              <el-dropdown>
                <div class="el-dropdown-link">
                  <img :src="host+user.logo" height="50" width="50">
                  <div>{{ user.nickname }}</div>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>

                    <el-dropdown-item @click="updateUserVisible = true">
                      <el-icon>
                        <avatar/>
                      </el-icon>
                      个人信息
                    </el-dropdown-item>
                    <el-dropdown-item @click="logout">
                      <el-icon>
                        <remove/>
                      </el-icon>
                      登出
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </el-header>

      <el-main>
        <el-scrollbar>
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>

  <el-dialog v-model="updateUserVisible" title="修改个人信息" @close="cancelDialog">
    <el-form :model="updateUserForm" label-width="80px" label-position="left">
      <el-form-item label="头像：">
        <img :src="host+updateUserForm.logo" width="100" height="100">
        <el-upload
            class="avatar-uploader"
            :action="host + 'uploadImage'"
            :show-file-list="false"
            :on-error="handleAvatarError"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名：">
        {{ updateUserForm.username }}
      </el-form-item>
      <el-form-item label="昵称:">
        <el-input v-model="updateUserForm.nickname"/>
      </el-form-item>
      <el-form-item label="简介：">
        <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入个人简介"
            v-model="updateUserForm.introduction">
        </el-input>
      </el-form-item>
      <el-form-item label="生日：">
        <el-date-picker
            v-model="updateUserForm.birthday"
            type="date"
            placeholder="请选择生日"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            :default-time="updateUserForm.birthday"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelDialog">取消</el-button>
        <el-button type="primary" @click="updateUserMsg">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>

import {Platform, List, Avatar, Remove} from "@element-plus/icons-vue";
import {report, getUserMsg, updateUserMsg} from "@/api/api";
import rounte from "@/router/routes";
import proxy from "@/config/proxy";

export default {
  name: "HomeView",
  data() {
    return {
      host: "",
      imageFile: "",
      updateUserForm: {},
      updateUserVisible: false,
      isCollapse: false,
      asideWidth: "150px",
      user: {},
      activeMenu: {},//当前激活的菜单
      menuList: []
    };
  },
  methods: {
    toggleClick() {
      this.isCollapse = !this.isCollapse;
      this.asideWidth = this.isCollapse ? "65px" : "150px";
    },
    active() {
      let tmp = "";
      let res = "";
      if (!this.$route.path) {
        return tmp;
      }
      const pathArr = this.$route.path.split("/");
      if (pathArr.length > 1) {
        tmp = pathArr[pathArr.length - 1];
      }
      for (let i of this.menuList) {
        if (i.path === tmp) {
          res = i;
        }
      }
      return res;
    },
    changeMenu(menu) {
      this.$router.push(menu.path);
      this.activeMenu = menu;
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
    },
    updateUserMsg() {
      this.updateUserVisible = false;
      updateUserMsg(this.updateUserForm).then(res => {
        if (res.code === 0) {
          this.$message.success("更改成功");
          location.reload();
        } else {
          this.$message.warning("更改失败");
        }
      }).catch(error => {
        this.$message.warning("服务器错误" + error);
      });
    },
    cancelDialog() {
      this.updateUserVisible = false;
      this.getMyUserMsg();
    },
    handleAvatarError() {
      this.$message.warning("上传失败");
    },
    handleAvatarSuccess(res, file) {
      this.imageFile = res.data.path;
      this.updateUserForm.logo = this.imageFile;
      this.$message.success("上传成功");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 20;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 20MB!");
      }
      return isJPG && isLt2M;
    },
    getMyUserMsg() {
      getUserMsg({
        "username": localStorage.getItem("loginName")
      }).then(res => {
        if (res.code === 0) {
          this.user = res.data;
          localStorage.setItem("userId", this.user.id);
          this.updateUserForm = JSON.parse(JSON.stringify(this.user));
        } else {
          this.$message.warning("获取用户信息失败");
        }
      }).catch(error => {
        this.$message.warning("获取用户信息失败" + error);
      });
    }
  },
  components: {Platform, List, Avatar, Remove},
  mounted() {
    this.heartBeat();
    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(this.heartBeat, 10000);
    }
    this.menuList = [];
    for (let i of rounte) {
      if (i.name === "home") {
        this.menuList = i.children;
      }
    }
    this.activeMenu = this.active();
  },
  created() {
    const env = process.env.NODE_ENV || "development";
    this.host = proxy[env].host;
    this.getMyUserMsg();
  },
  unmounted() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
.logo {
  height: 200px;
  background-image: url('../assets/girl.jpeg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.title {
  position: absolute;
  transform: translate(-50% -50%);
  letter-spacing: 5px;
  color: blue;
  margin-left: 20px;
  margin-top: 15px;
  font-size: 200%;
}

.aside {
  background-color: #545c64
}

.home-container {
  height: 100%;
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
