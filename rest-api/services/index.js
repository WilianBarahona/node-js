'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken(user){
    const payload = { // ver anotaciones.txt para saber que es payload
        sub: user._id, //evitar que el id de la base sea el id del payload, hacer esto por cuestiones practicas
        iat: moment().unix() , //fecha de creacion del token, unix() => tiempo en formato unix() -> 00:00:00 Thurday, 1 January 2019
        exp: moment().add(14, 'days').unix() //fecha en que expira el token, el token vencera en 14 dias 
    }

    //codificar payload
    return jwt.encode(payload, config.SECRET_TOKEN) // El secret token se configura en el server
}

module.exports = createToken