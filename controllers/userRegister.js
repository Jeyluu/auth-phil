const user = require('../models/user')



module.exports = (req,res) => {
    user.create(req.body, (error,user) => {

        if(error) {
        return res.redirect('/user/create')
        }

        res.redirect('/')
    })
}