const mongoose = require('mongoose');
const Article = require('./models/article')

mongoose.connect('mongodb://localhost:27017/blog-test');


Article.findByIdAndUpdate("6007f8a23b82902f8805b19f", {
    title: 'Avenger End-Game'
}, (err,post) => {
    console.log(err, post);
})

/*
Article.findById("6007f8a23b82902f8805b19f", (err, articles) => {
    console.log(err, articles);
} )
*/
/*
Article.find({
    intro:"Test introduction",
}, (err, articles) => {
    console.log(err, articles);
})
*/
/*
Article.create({
    title : "Spideman",
    intro:"Test introduction",
    content:"Critiques sur le film Spiderman",
}, (error, post) => {
    console.log(error, post)
}
)
*/