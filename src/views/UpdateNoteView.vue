<template>
  <el-form>
    <el-form-item>
      <el-input v-model="title" placeholder="请输入标题"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input
          v-model="content"
          :rows="20"
          type="textarea"
          placeholder="请输入内容"
      />
    </el-form-item>
    <el-form-item style="float: right">
      <el-button type="primary" @click="showDialog">更新</el-button>
    </el-form-item>
  </el-form>
  <el-dialog v-model="dialogVisible" title="发布随笔">
    <el-form label-width="120px" label-position="left">
      <el-form-item label="是否公开：">
        <el-radio v-model="isPublic" label="1">公开</el-radio>
        <el-radio v-model="isPublic" label="0">私密</el-radio>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="update">更新随笔</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import {getArticleById, updateArticle} from "@/api/api";

export default {
  data() {
    return {
      id: 0,
      title: "",
      content: "",
      isPublic: "1",
      dialogVisible: false
    };
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    update() {
      this.dialogVisible = false;
      let data = {
        id: this.id,
        title: this.title,
        content: this.content,
        is_public: this.isPublic
      };
      updateArticle(data).then(res => {
        if (res.code === 0) {
          this.$message.success("更新日记成功");
          this.$router.push("note");
        } else {
          this.$message.warning("更新日记失败");
        }
      }).catch(error => {
        this.$message.warning("服务器错误" + error);
      });
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    getArticleById({id: this.id}).then(res => {
      if (res.code === 0) {
        this.title = res.data.title;
        this.content = res.data.content;
        this.isPublic = res.data.is_public.toString();
      } else {
        this.$message.warning("获取日记信息失败");
      }
    }).catch(error => {
      this.$message.warning("服务器错误" + error);
    });
  }
};
</script>