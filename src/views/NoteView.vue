<template>
  <el-form :inline="true" :model="searchParams" class="demo-form-inline">
    <el-form-item label="标题">
      <el-input v-model="searchParams.title" placeholder="标题查询"/>
    </el-form-item>
    <el-form-item label="发布时间范围查询">
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
    <el-form-item label="是否公开">
      <el-select v-model="searchParams.isPublic" placeholder="是否公开">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button @click="clean">清空</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" border stripe style="width: 100%">
    <el-table-column prop="title" label="标题" width="200px" show-overflow-tooltip="true"/>
    <el-table-column prop="content" label="内容" show-overflow-tooltip="true"/>
    <el-table-column prop="create_time" label="发布时间" width="170px" align="center"/>
    <el-table-column prop="update_time" label="更新时间" width="170px" align="center"/>
    <el-table-column prop="is_public" label="是否公开" width="80px" align="center"/>
    <el-table-column label="操作" width="240px" align="center">
      <template #default="scope">
        <el-button size="small" @click="handleView(scope.$index, scope.row)" type="info">查看</el-button>
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-popover v-model:visible="scope.row.delete_visible" placement="top" :width="160">
          <p>是否要删除文章?</p>
          <div style="text-align: right; margin: 0">
            <el-button size="small" type="text" @click="scope.row.delete_visible=false">取消</el-button>
            <el-button size="small" type="primary" @click="handleDeleteConfirm(scope.$index, scope.row)">确认</el-button>
          </div>
          <template #reference>
            <el-button size="small" type="danger" @click="scope.row.delete_visible=true">删除</el-button>
          </template>
        </el-popover>
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
import {getArticle, deleteArticle} from "@/api/api";

export default {
  data() {
    return {
      searchParams: {
        title: "",
        createTimeZone: [],
        isPublic: ""
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
    handleEdit(index, row) {
      this.$router.push({path: "updateArticle", query: {id: row.id}});
    },
    handleView(index, row) {
      let routeUrl = this.$router.resolve({path: "/seeNote", query: {id: row.id}});
      window.open(routeUrl.href, "_blank");
    },
    handleDeleteConfirm(index, row) {
      deleteArticle({
        id: row.id,
        is_delete: 1
      }).then(res => {
        if (res.code === 0) {
          this.$message.warning("删除成功");
          this.search();
        } else {
          this.$message.warning("删除失败" + res.msg);
        }
      }).catch(error => {
        this.$message.warning("服务器错误" + error);
      });
    },
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
        "pageSize": this.pageParams.pageSize,
        "user_id": localStorage.getItem("userId"),
        "is_delete": "0"
      };
      if (this.searchParams.title !== "") {
        data["title"] = this.searchParams.title;
      }
      if (this.searchParams.isPublic !== "") {
        data["isPublic"] = this.searchParams.isPublic;
      }
      if (this.searchParams.createTimeZone !== []) {
        data["createTimeZone"] = this.searchParams.createTimeZone;
      }
      getArticle(data).then(res => {
        if (res.code === 0) {
          this.tableData = [];
          for (let i of res.data.data) {
            this.tableData.push({
              id: i.id,
              title: i.title,
              content: i.content,
              create_time: i.create_time,
              update_time: i.update_time,
              is_public: i.is_public === 0 ? "否" : "是",
              delete_visible: false
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
      getArticle({
        "currentPage": this.pageParams.currentPage,
        "pageSize": this.pageParams.pageSize,
        "user_id": localStorage.getItem("userId"),
        "is_delete": "0"
      }).then(res => {
        if (res.code === 0) {
          this.tableData = [];
          for (let i of res.data.data) {
            this.tableData.push({
              id: i.id,
              title: i.title,
              content: i.content,
              create_time: i.create_time,
              update_time: i.update_time,
              is_public: i.is_public === 0 ? "否" : "是",
              delete_visible: false
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