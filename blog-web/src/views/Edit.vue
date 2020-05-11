<template>
  <el-form :model="article" label-width="90px">
    <el-form-item label="文章标题">
      <el-input v-model="article.title"></el-input>
    </el-form-item>
    <el-form-item label="文章内容">
      <el-input v-model="article.body" type="textarea"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="saveArticle">保存</el-button>
      <el-button @click="$router.push('/article/list')">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      article: {}
    }
  },
  created(){
    this.getArticle()
  },
  methods:{
    async getArticle(){
      const res = await this.$http.get(`/articles/${this.$route.params.id}`)
      this.article = res.data
    },
    async saveArticle(){
      const res = await this.$http.put(`/articles/${this.$route.params.id}`, this.article)
      if(res.status === 200){
        this.$message.success('修改文章成功')
        this.$router.push('/article/list')
      }else{
        this.$message.error('修改文章失败')
      }
    }
  }
}
</script>

<style scoped>
</style>