const user = require('../models/user')
const User = require('../models/user')


module.exports = (req,res) => {
    user.create(req.body, (error,user) => {
        res.redirect('/')
    })
}