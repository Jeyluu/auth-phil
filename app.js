const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose')

const app = express();

app.use(express.static('public'));


//MongoDb
mongoose.connect('mongodb://localhost:27017/shop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})


//handlerbars
app.engine('hbs', exphbs({defaultLayout:'main', extname: "hbs"}));
app.set('view engine', 'hbs');

//Route
app.get('/', (req,res) => {
    res.render('index')
})

app.get('/contact', (req,res) => {
    res.render('contact')
})

app.listen(2500, () => {
    console.log('Server ok sur pour 2500')
})