const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema ({

    name:String,
    email:String,
    password:String,
    
});


//Middleware pour Crypter le mot de passe
userSchema.pre('save', function (next) {

    //const user recupère les données dans le formulaire
    const user = this

    bcrypt.hash(user.password, 10, (error, encrypted) => {
        user.password = encrypted
        next()
    })
})

module.exports = mongoose.model('user',userSchema)