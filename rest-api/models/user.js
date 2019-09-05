'use strict'
const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true, lowercase: true} ,//lowercase: true guardar el email en minuscula, unique: true que sea unico
    name: String,
    avatar: String,
    password: {type: String, select: false}, //select: false => cada vez que se haga un get, no devuelva este atributo
    signupDate: {type: Date, default: Date.now()}, //por defecto la fecha y hora actual
    lastLogin: Date, //registro del ultimo login
})

//Moongose proporciona funcionalidades que se pueden ejecutar antes o despues de almacenar en la db
userSchema.pre('save', (next) =>{
    //pre => antes , save, antes de guardar, next para avanzar al siguiente middleware y no se quede parada esta funcion
    let user = this // this => userSchema
    // if(!user.isModified('password')) //si el usuario no ha modificado el password
    //     //==>No encriptar
    //     return next() //pase al sigueinte middleware

    bcrypt.genSalt(10, (error, salt)=>{ //salt => datosAleatorios que se usan como entrada adicionala al texto plano del password
                                            //10 => saltRound
        if(error)
            return next() //pasar al siguiente middelware
        
        bcrypt.hash(user.password, salt, null, (error, hash)=>{
            //Store hash in your password DB
            if(error)
                return next()
            
            user.password = hash
            next()
        })
    })
}) 

//Methods => funcionalidad de mongoose , metodos
userSchema.methods.gravatar = ()=>{ //generar un avatar aleatorio con gravatar
    if (!this.email) 
        return  `https://gravatar.com/avatar/?s=200&d=retro` // si no hay un email registrado en gravatar, establecer avatar por defecto

    // por defecto gravatar usa md5 en sus url para generar el avatar
    const md5 = crypto.createHash('md5').update(this.email).digest('hex') // generar el md5 para el email
    
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`

}

module.exports = mongoose.model('users', userSchema)