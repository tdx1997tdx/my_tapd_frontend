<template>
  <el-form>
    <el-form-item>
      <el-input v-model="title" placeholder="请输入标题"></el-input>
    </el-form-item>
    <el-form-item>
      <md-editor v-model="content"/>
    </el-form-item>
    <el-form-item style="float: right">
      <el-button type="primary" @click="showDialog">发布</el-button>
    </el-form-item>
  </el-form>
  <el-dialog v-model="dialogVisible" title="发布随笔">
    <el-form label-width="120px" label-position="left">
      <el-form-item label="是否公开：">
        <el-radio v-model="isPublic" label="1">公开</el-radio>
        <el-radio v-model="isPublic" label="0">私密</el-radio>
      </el-form-item>
      <el-form-item label="日记发布时间：">
        <el-date-picker
            v-model="createTime"
            type="datetime"
            placeholder="请选择时间"
            format="YYYY-MM-DD hh:mm:ss"
            value-format="YYYY-MM-DD hh:mm:ss"
            :default-time="createTime"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="publish">发布随笔</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import formatTime from "@/utils/formatTime";
import {publicArticle} from "@/api/api";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

export default {
  data() {
    return {
      title: "",
      content: "",
      isPublic: "1",
      createTime: "",
      dialogVisible: false
    };
  },
  components: {MdEditor},
  methods: {
    showDialog() {
      this.dialogVisible = true;
      this.createTime = formatTime(new Date().getTime());
    },
    publish() {
      this.dialogVisible = false;
      let data = {
        title: this.title,
        content: this.content,
        isPublic: this.isPublic,
        createTime: this.createTime,
        author_id: localStorage.getItem("userId")
      };
      publicArticle(data).then(res => {
        if (res.code === 0) {
          this.$message.warning("发布成功");
          this.$router.push("/home");
        } else {
          this.$message.warning("发布失败" + res.msg);
        }
      }).catch(error => {
        this.$message.warning("发布失败服务器错误" + error);
      });
      this.init();
    },
    init() {
      this.title = "";
      this.content = "";
      this.isPublic = "1";
    }
  }
};
</script>