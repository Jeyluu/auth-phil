const path = require('path');
const Post = require('../models/article')


module.exports = (req, res) => {

    const { image } = req.files;

    const uploadFile = path.resolve(__dirname,'..', 'public/articles', image.name);

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

}