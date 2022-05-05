<template>
  <h1 style="text-align: center">{{ noteData.title }}</h1>
  <h3 style="text-align: center">作者：{{ noteData.author_name }}，发布时间：{{ noteData.create_time }}，更新时间：{{ noteData.update_time }}</h3>
  <span>{{ noteData.content }}</span>
</template>
<script>
import {getArticleById} from "@/api/api";

export default {
  data() {
    return {
      noteData: ""
    };
  },
  methods: {},
  mounted() {
    this.id = this.$route.query.id;
    getArticleById({id: this.id}).then(res => {
      if (res.code === 0) {
        this.noteData = res.data;
      } else {
        this.$message.warning("获取日记信息失败");
      }
    }).catch(error => {
      this.$message.warning("服务器错误" + error);
    });
  }
};
</script>