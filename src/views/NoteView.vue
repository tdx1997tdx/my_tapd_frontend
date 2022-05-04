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
          format="YYYY-MM-DD  hh:mm:ss"
          value-format="YYYY-MM-DD  hh:mm:ss"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" border stripe style="width: 100%">
    <el-table-column
        v-for="col in columnList"
        :prop="col.prop"
        :label="col.label"
        :key="col.prop"
    />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      searchParams: {
        title: "",
        createTimeZone: []
      },
      columnList: [
        {prop: "title", label: "标题"},
        {prop: "content", label: "内容"},
        {prop: "createTime", label: "发布时间"},
        {prop: "updateTime", label: "更新时间"}
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
      tableData: [{
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄"
      }, {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄"
      }, {
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1519 弄"
      }, {
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1516 弄"
      }]
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    search() {
      console.log(this.searchParams);
    }
  }
};
</script>