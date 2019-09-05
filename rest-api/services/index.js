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

function decodeToken(token){
    const decoded = new Promise((resolve, reject)=>{//promesa, resolve => la promesa se ha cumplido, reject => ha ocurrido un error en la promesa
        try{
            const payload = jwt.decode(token, config.SECRET_TOKEN)

            if(payload.exp <= moment().unix()){
                reject({
                    status: 401,
                    message: `El token ha expirado`
                })
            }

            resolve(payload.sub) //payload.sub es el id del usuario

            //cuando se llame a la promesa el .then obtendra el resolve la solucion a la promesa=> si ha expiorado o no

        }catch(err){
            reject({
                status: 500,
                message: `Invalid Token`
            })
        }
    }) 

    return decoded
}

module.exports = {
    createToken,
    decodeToken
}