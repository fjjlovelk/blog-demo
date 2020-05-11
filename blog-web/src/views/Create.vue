<template>
  <el-form :model="article" label-width="90px">
    <el-form-item label="文章标题">
      <el-input v-model="article.title"></el-input>
    </el-form-item>
    <el-form-item label="文章内容">
      <el-input v-model="article.body" type="textarea"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="saveArticle">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      article: {
        title: '',
        body: ''
      }
    }
  },
  methods:{
    async saveArticle(){
      const res = await this.$http.post('/articles', this.article)
      if(res.status === 200){
        this.$message.success('添加文章成功')
        this.$router.push('/article/list')
      }else{
        this.$message.error('添加文章失败')
      }
    }
  }
}
</script>

<style scoped>
</style>