<template>
  <el-container class="home-container">
    <el-aside :width="asideWidth">
      <div class="logo">TAPD</div>
      <el-menu router="true" :collapse="isCollapse">
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
        <div class="toolbar">
          <span>Tom</span>
        </div>
      </el-header>

      <el-main>
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

export default defineComponent({
  name: "HomeView",
  data() {
    return {
      isCollapse: false,
      asideWidth: "150px"
    };
  },
  methods: {
    toggleClick() {
      this.isCollapse = !this.isCollapse;
      this.asideWidth = this.isCollapse ? "65px" : "150px";
    }
  },
  components: {Platform, List}
});
</script>

<style scoped>
.logo {
  margin: 0 auto;
  text-align: center;
  line-height: 80px;
  height: 100px;
  font-size: 20px;
  background-color: cyan;
}

.home-container {
  height: 100%;
}

.home-container .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.home-container .el-aside {
  background-color: cyan;
}

.home-container .el-menu {
  background-color: cyan;
}

.home-container .el-main {
  padding: 0;
}

.home-container .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

.toggle-button {
  background-color: #42b983;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.5em;
  cursor: pointer;
}
</style>
