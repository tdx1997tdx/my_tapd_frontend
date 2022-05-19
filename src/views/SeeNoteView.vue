<template>
  <div class="see_container">
    <div style="background-color: white;width: 1000px;margin: 0 auto;">
      <h1 style="text-align: center">{{ noteData.title }}</h1>
      <h3 style="text-align: center">作者：{{ noteData.author_name }}，发布时间：{{
          noteData.create_time
        }}，更新时间：{{ noteData.update_time }}</h3>
      <h3 style="text-align: center">浏览量:{{ noteData.pv }}</h3>
<!--      <div style="margin-top:20px;text-align: center">-->
<!--        <el-button type="primary" round>赞</el-button>-->
<!--      </div>-->
    </div>
    <md-editor
        v-model="noteData.content"
        style="width: 1000px;margin: 0 auto;"
        previewOnly
    />
  </div>

</template>
<script>
import {getArticleById} from "@/api/api";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

export default {
  data() {
    return {
      noteData: ""
    };
  },
  methods: {},
  components: {MdEditor},
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

<style scoped>
.see_container {
  width: 100%;
  background-image: url('../assets/girl2.jpeg');
  background-position: center center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}

</style>