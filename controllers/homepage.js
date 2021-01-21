
//Post
const Post = require('../models/article')

module.exports = async (req, res) => {
    const posts = await Post.find({})
    res.render('index', { posts })
}