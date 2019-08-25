'use strict' //modo estricto, es una funcionalidad de ES5, esto ayuda a capturar errores y mostrar la excepcion, 
            //previene errores con acciones consideradas como inseguras, usar strict hace nuestro codigo mas seguro

const express = require('express') //express es un framework encargado de proporcionar funcionalidades como enrrutamiento, gestion de sesiones, cookies, etc
                                   //Ayudando a reducir el tiempo de desarrollo 

const bodyParser = require('body-parser') //body-parser extrae la parte del cuerpo de los request y las expone en req.body,
                                          //Este módulo body-parser analiza el JSON, el búfer, la cadena y los datos codificados URL enviados mediante la solicitud HTTP POST

const port = process.env.PORT || 3000 //process.env.PORT ==> variable de entorno que se configura en el servidor ejemplo: plataformas como heroku, 
                                      //donde se guarda el puerto donde se ejecutura el server
                                      // En caso de no encontrar esta configuracion en el servidor ejecturarse en el puerto 3000

const app = express()

//BodyParser --> permite optener la url de metodos http de envio de informacion
app.use(bodyParser.urlencoded({extended: false})) //permite analizar los urlencoded, para peticiones como get
                                                  // el obejto req.body contiene los datos analizados, este objeto contendra pares
                                                  // de datos  --> llave: valor, donde le valor puede ser una cadena o matriz cuando extended : false
                                                  // o cualquier tipo cuando extended : true
                                                  //extended permite elegir entre analizar datos codificados en url con la querystring bliblioteca cuando es falso 
                                                  //o la qus biblioteca cuando es true, por lo que la mejor libreria en la actualidad es querystring
                                                  //el valor por defecto es extended : true
                                                  
app.use(bodyParser.json()) //permite admitir peticiones en formato json

//Request
app.get('/hola',(req, res)=>{
    //req -> request, res -> response
    res.send({message:"hola mundo"})
})

//parametros
app.get('/hola/:name',(req, res)=>{
    //req -> request, res -> response
    res.send({message:`hola ${req.params.name}`})  //obtener los parametros enviados por la url--> req.params.name
})

app.listen(port, ()=>{
    console.log(`sevidor levantado localhost:${port}`)
})
