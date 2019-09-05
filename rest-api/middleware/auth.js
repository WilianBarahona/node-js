'use strict'
const services = require('../services')

function isAuth(req, res, next){ // verifica si un usuario tiene un json web token valido
    if(!req.headers.authorization){
        //existe en el header del request una autorizacion de acceso?
        return res.status(403).send({message: `No tiene autorizacion`})
    }

    const token = req.headers.authorization.split(' ')[1] //con split toda la cadena, se convierte en un array => split por ' '
                                                          // autorization esta compuesto por dos partes separadas por ' '
                                                          // 'parte1 parte2' , la parte 2 es el token
    services.decodeToken(token)
    .then((data)=>{
        req.user = data
        next()
    })
    .catch((error)=>{
        res.status(error.status)
    })

}

module.exports = isAuth

