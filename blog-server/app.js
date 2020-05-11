const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(require('cors')())
app.use(express.json())

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
  .then(() => {
    console.log('数据库连接成功')
  })
  .catch(err => {
    console.log('数据库连接失败', err)
  })

const Article = mongoose.model('Article', new mongoose.Schema({
  title: String,
  body: String
}))

// 创建文章
app.post('/api/articles', async (req, res) => {
  const article = await Article.create(req.body)
  res.send(article)
})
// 获取文章列表
app.get('/api/articles', async (req, res) => {
  const articleList = await Article.find()
  res.send(articleList)
})
// 删除文章
app.delete('/api/articles/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.send({ state: true })
})
// 进入编辑文章
app.get('/api/articles/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.send(article)
})
// 编辑文章
app.put('/api/articles/:id', async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body)
  res.send(article)
})

app.listen(3000, () => {
  console.log('server is running')
})