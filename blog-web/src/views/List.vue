<template>
  <div>
    <el-table :data="articleList" border>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="内容" prop="body"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button @click="edit(scope.row._id)" type="primary" size="mini">编辑</el-button>
          <el-button @click="remove(scope.row._id)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleList: []
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    async getArticleList() {
      const res = await this.$http.get('/articles')
      if (res.status === 200) {
        this.articleList = res.data
      } else {
        this.$message.error('获取文章列表失败')
      }
    },
    edit(id) {
      this.$router.push(`/article/${id}/edit`)
    },
    remove(id) {
      this.$confirm('确定删除该文章？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await this.$http.delete(`articles/${id}`)
          if (res.status === 200) {
            this.$message.success('删除文章成功')
            this.getArticleList()
          } else {
            this.$message.error('删除文章失败')
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style scoped>
</style>