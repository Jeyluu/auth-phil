const express = require('express');
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const fileupload = require('express-fileupload');
const path = require('path');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());

//MongoDb
mongoose.connect('mongodb://localhost:27017/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})



//Post
const Post = require('./models/article')

//handlerbars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: "hbs", handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'hbs');

//Route
app.get('/', async (req, res) => {

    const posts = await Post.find({})

    res.render('index', { posts })
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

//articles

app.get('/articles/:id', async (req, res) => {

    const article = await Post.findById(req.params.id)

    res.render("articles", { article })
})

app.get("/article/add", (req, res) => {
    res.render("article/add")
})

//post

app.post("/articles/post", (req, res) => {

    const { image } = req.files;

    const uploadFile = path.resolve(__dirname, 'public/articles', image.name);

    image.mv(uploadFile, (error) => {
        Post.create(
            {
                ...req.body,
                image : `/articles/${image.name}`
            }

            , (err, post) => {
            res.redirect('/')
        })
    })

});

app.listen(2500, () => {
    console.log('Server ok sur pour 2500')
})