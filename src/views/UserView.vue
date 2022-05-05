<template>
  <el-form :inline="true" :model="searchParams" class="demo-form-inline">
    <el-form-item label="用户名">
      <el-input v-model="searchParams.title" placeholder="用户名查询"/>
    </el-form-item>
    <el-form-item label="创建时间范围查询">
      <el-date-picker
          v-model="searchParams.createTimeZone"
          type="datetimerange"
          :shortcuts="shortcuts"
          range-separator="To"
          format="YYYY-MM-DD hh:mm:ss"
          value-format="YYYY-MM-DD hh:mm:ss"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
      />
    </el-form-item>
    <el-form-item>
      <el-button @click="clean">清空</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" border stripe style="width: 100%">
    <el-table-column prop="username" label="用户名" width="200px"/>
    <el-table-column prop="nickname" label="昵称" width="200px"/>
    <el-table-column prop="introduction" label="简介" show-overflow-tooltip="true"/>
    <el-table-column prop="create_time" label="创建时间" width="170px" align="center"/>
    <el-table-column label="操作" width="80px" align="center">
      <template #default="scope">
        <el-button size="small" @click="handleView(scope.$index, scope.row)" type="info">查看</el-button>
        <!--        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
        <!--        <el-popover v-model:visible="scope.row.delete_visible" placement="top" :width="160">-->
        <!--          <p>是否要删除文章?</p>-->
        <!--          <div style="text-align: right; margin: 0">-->
        <!--            <el-button size="small" type="text" @click="scope.row.delete_visible=false">取消</el-button>-->
        <!--            <el-button size="small" type="primary" @click="handleDeleteConfirm(scope.$index, scope.row)">确认</el-button>-->
        <!--          </div>-->
        <!--          <template #reference>-->
        <!--            <el-button size="small" type="danger" @click="scope.row.delete_visible=true">删除</el-button>-->
        <!--          </template>-->
        <!--        </el-popover>-->
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      style="margin-top: 20px;float: right"
      :currentPage="pageParams.currentPage"
      :page-size="pageParams.pageSize"
      :page-sizes="pageParams.pageSizeOption"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageParams.totalPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
  />
</template>
<script>
import {getUser} from "@/api/api";

export default {
  data() {
    return {
      searchParams: {
        username: "",
        nickname: "",
        createTimeZone: []
      },
      pageParams: {
        currentPage: 1,
        pageSize: 5,
        pageSizeOption: [5, 10, 20, 30],
        totalPage: 0
      },
      options: [
        {label: "是", value: "1"},
        {label: "否", value: "0"}
      ],
      shortcuts: [
        {
          text: "Last week",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          }
        },
        {
          text: "Last month",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          }
        },
        {
          text: "Last 3 months",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          }
        }
      ],
      tableData: []
    };
  },
  methods: {
    // handleEdit(index, row) {
    //   this.$router.push({path: "updateArticle", query: {id: row.id}});
    // },
    handleView(index, row) {
      console.log(index, row);
    },
    // handleDeleteConfirm(index, row) {
    //   deleteArticle({
    //     id: row.id,
    //     is_delete: 1
    //   }).then(res => {
    //     if (res.code === 0) {
    //       this.$message.warning("删除成功");
    //       this.search();
    //     } else {
    //       this.$message.warning("删除失败" + res.msg);
    //     }
    //   }).catch(error => {
    //     this.$message.warning("服务器错误" + error);
    //   });
    // },
    handleSizeChange(val) {
      this.pageParams.pageSize = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.pageParams.currentPage = val;
      this.search();
    },
    search() {
      let data = {
        "currentPage": this.pageParams.currentPage,
        "pageSize": this.pageParams.pageSize
      };
      if (this.searchParams.username !== "") {
        data["username"] = this.searchParams.username;
      }
      if (this.searchParams.nickname !== "") {
        data["nickname"] = this.searchParams.nickname;
      }
      if (this.searchParams.createTimeZone !== []) {
        data["createTimeZone"] = this.searchParams.createTimeZone;
      }
      getUser(data).then(res => {
        if (res.code === 0) {
          this.tableData = [];
          for (let i of res.data.data) {
            this.tableData.push({
              id: i.id,
              username: i.username,
              nickname: i.nickname,
              introduction: i.introduction,
              create_time: i.create_time,
              update_time: i.update_time
            });
          }
          this.pageParams.totalPage = res.data.total;
          this.pageParams.currentPage = res.data.currentPage;
        } else {
          this.$message.warning("查询失败" + res.msg);
        }
      }).catch(error => {
        this.$message.warning("服务器错误" + error);
      });
    },
    clean() {
      this.searchParams.title = "";
      this.searchParams.createTimeZone = [];
      this.searchParams.isPublic = "";
    },
    getMyArticle() {
      getUser({
        "currentPage": this.pageParams.currentPage,
        "pageSize": this.pageParams.pageSize
      }).then(res => {
        if (res.code === 0) {
          this.tableData = [];
          for (let i of res.data.data) {
            this.tableData.push({
              id: i.id,
              username: i.username,
              nickname: i.nickname,
              introduction: i.introduction,
              create_time: i.create_time,
              update_time: i.update_time
            });
          }
          this.pageParams.totalPage = res.data.total;
          this.pageParams.currentPage = res.data.currentPage;
        }
      });
    }
  },
  mounted() {
    this.getMyArticle();
  }
};
</script>