'use strict'
const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

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
    let user = this
    
}) 