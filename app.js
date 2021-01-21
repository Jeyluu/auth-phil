const express = require('express');
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const fileupload = require('express-fileupload');
const path = require('path');

//controller
//article
const articleSingleController = require('./controllers/articleSingle')
const articleAddController = require('./controllers/articleAdd')
const articlePostController = require('./controllers/articlePost')
const homePage = require('./controllers/homepage')

//user
const userCreate = require('./controllers/userCreate')
const userRegister = require('./controllers/userRegister')


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

//handlerbars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: "hbs", handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'hbs');

//Middleware
const articleValidPost = require('./middleware/articleValidPost')
app.use("/articles/post",articleValidPost)

app.get('/', homePage)


//articles
app.get("/articles/add",articleAddController)
app.get('/articles/:id', articleSingleController)
app.post("/articles/post",articlePostController);

//users
app.get('/user/create', userCreate)
app.post('/user/register', userRegister)

//contact 
app.get('/contact', (req, res) => {
    res.render('contact')
})




app.listen(2500, () => {
    console.log('Server ok sur pour 2500')
})