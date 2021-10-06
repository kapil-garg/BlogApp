const express = require('express')
const articleRouter = require('./routes/articles')
const mongoose = require('mongoose')
const Article = require('./models/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost:27017/blog', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connection Successfull"))
    .catch((err) => console.log(err));


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use('/articles',articleRouter)




app.get('/', async (req, res) =>{
    const articles = await Article.find().sort({createdOn:'desc'})
    res.render('articles/index', {articles:articles}) 
})


app.listen(5000)