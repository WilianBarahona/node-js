'use strict' //modo estricto, evita muchas cosas de js, como asignar valores a una variable indefinida x=5 => error porque no esta definida, var x = 5 => ok
const mongoose = require('mongoose') //importar mongoose
const schema = mongoose.Schema

const productSchema = schema({
    //estructura del schema
    name: String,
    picture: String,
    price: {type: Number, default: 0}, //que sea numerico y por defecto sea 0
    // category: {String, enum: ['computer','phones','accesories']}, // que sea string y que solo permita introducir los valores del => array
    category: String,
    description: String
})

//exportar el modelo ==> mongoose.model('name_model',schema)
module.exports = mongoose.model('products', productSchema)