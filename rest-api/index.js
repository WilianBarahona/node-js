'use strict' //modo estricto, es una funcionalidad de ES5, esto ayuda a capturar errores y mostrar la excepcion, 
            //previene errores con acciones consideradas como inseguras, usar strict hace nuestro codigo mas seguro

const express = require('express') //express es un framework encargado de proporcionar funcionalidades como enrrutamiento, gestion de sesiones, cookies, etc
                                   //Ayudando a reducir el tiempo de desarrollo 

const bodyParser = require('body-parser') //body-parser extrae la parte del cuerpo de los request y las expone en req.body,
                                          //Este módulo body-parser analiza el JSON, el búfer, la cadena y los datos codificados URL enviados mediante la solicitud HTTP POST

const port = process.env.PORT || 3000 //process.env.PORT ==> variable de entorno que se configura en el servidor ejemplo: plataformas como heroku, 
                                      //donde se guarda el puerto donde se ejecutura el server
                                      // En caso de no encontrar esta configuracion en el servidor ejecturarse en el puerto 3000

const mongoose  = require('mongoose') // modulo para gestionar schemas en mongodb y conectarse de manera mas facil

//Schemas
const product = require('./models/product') //importar el schema product

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
    res.send({message:`hola ${req.params.name}`}) //obtener los parametros enviados por la url--> req.params.name
})

mongoose.connect(`mongodb://localhost:27017/shop`, { useNewUrlParser: true }) //puerto por defecto es 27017 de mongo db, mongodb://ip:port/name_db
.then((res)=>{                                                                // => { useNewUrlParser: true }, agregar este json, de omitirlo muestra un warning de deprecation
//function callback, todo esta bien => esta es una promesa, se ejecuta una vez se hay finalizado la conexion a mongodb
console.log(`Se conecto a mongodb: ${res}`)

    //Antes de levantar el servidor es necesario tener la base de datos conectada, para evitar errores
    //una vez conectado a mongodb, levantar el server
    app.listen(port, ()=>{
        console.log(`sevidor levantado localhost:${port}`)
    })
})
.catch((error)=>{
    //function callback, ocurrio error => esta es una promesa
    return console.log(`Error al conectar a la db: ${error}`) // return para salir

})



// Peticiones basicas
app.get('/api/products',(req, res)=>{ //url ==> endpoint
    //res.status(200).send({data: data}) //200: Status Ok, {data: data} => con ES6 se puede sustituir por {data}
    product.find()
    .then((data)=>{
        //promesa
        if(!data)
            return res.status(404).send({message:`No existen productos`})
        
        res.status(200).send({data})
    })
    .catch((error)=>{
        //promesa
        if(error)
            return res.status(500).send({error})
    })
})

app.get('/api/products/:id',(req, res)=>{
    //Obtener un porducto en especifico
    product.findById(req.params.id) //Funcion de mongodb, para buscar en la collection producto por id
    .then((data)=>{// promesa, data=> contiene el json del id especificado
        //ejecutar el siguiente codigo una vez finalizada la funcion findById
        if (!data)
          return res.status(404).send({message: `El producto ${productId} no existe`, error: true})

        res.status(200).send({data}) // {data: data} => se puede reducir con ES6 a {data}
    })
    .catch((error)=>{//Promasa, en caso de error
        if(error) 
            return res.status(500).send({error})
    })
})

app.post('/api/products/',(req, res)=>{
    //req.body => acceder al curpo de la peticion (url), parseado en formato json
    // res.status(200).send({menssage: 'El producto se ha recibido', params: req.body})

    //Instanciar el modelo
    let product = new product({
        name: req.body.name,
        price: req.body.price,
        picture: req.body.picture,
        category: req.body.category,
        description: req.body.description

    }) //objecto de mongoose

    product.save()
    .then((data)=>{
        res.status(200).send({data});
    })
    .catch((error)=>{
        res.status(500).send({error})
    });
})

app.put('/api/products/:id',(req, res)=>{
    // update({filtro:id},{nuevos datos})
    product.updateOne(
        {_id: req.params.id}, //Json filtro
        { //json => datos nuevos
            name: req.body.name,
            picture: req.body.picture,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description

        }
        )
        .then((data)=>{
            res.status(200).send({data})
        })
        .catch((error)=>{
            res.status(500).send({error})
        })


})

app.delete('/api/products/:id',(req, res)=>{
   // delete
    product.remove({_id: req.params.id}) //eliminar un documenteo de una collection
    .then((data)=>{// promesa, data=> contiene el json del id especificado
        //ejecutar el siguiente codigo una vez finalizada la funcion findById
        res.status(200).send({data}) // {data: data} => se puede reducir con ES6 a {data}
    })
    .catch((error)=>{//Promasa, en caso de error
        if(error) 
            return res.status(500).send({error})
    })
})

