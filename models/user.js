const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema ({
// on met dans un objet les caractréristiques souhaitées
    name:{
        type: String,
        required: true,
    },

    // unique = pas possible d'enregistrer deux fois la même adresse
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    
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