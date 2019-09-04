'use strict' 
const mongoose  = require('mongoose') 
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, { useNewUrlParser: true }) //puerto por defecto es 27017 de mongo db, mongodb://ip:port/name_db
.then((res)=>{                                          // => { useNewUrlParser: true }, agregar este json, de omitirlo muestra un warning de deprecado
//function callback, todo esta bien => esta es una promesa, se ejecuta una vez se hay finalizado la conexion a mongodb
console.log(`Se conecto a mongodb`)
    //Antes de levantar el servidor es necesario tener la base de datos conectada, para evitar errores
    //una vez conectado a mongodb, levantar el server
    app.listen(config.port, ()=>{
        console.log(`sevidor levantado localhost:${config.port}`)
    })
})
.catch((error)=>{
    //function callback, ocurrio error => esta es una promesa
    return console.log(`Error al conectar a la db: ${error}`) // return para salir

})
