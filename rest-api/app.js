'use strict'
const express = require('express') 
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const app = express()

const productRouter = require('./routes/product-route')

//middleware
app.use(bodyParser.urlencoded({extended: false}))                         
app.use(bodyParser.json())
//express-handlebars busca por defecto una carpeta llamada views, dentro de esta carpte
// busca un archivo padre donde contiene el esqueleto del html con los css y js necesarios

//Configurar el motor de plantillas de hbs
app.engine('.hbs', hbs({ // el motor recibe archivos .hbs 
    defaultLayout: 'default', // default.hbs => donde van el doctype, js, css y esqueleto principal de un html
    extname: '.hbs' //la extencion por defecto es .handlebars
}))

app.set('view engine' , '.hbs') //usar motor de vistas con extencion .hbs

app.use('/api', productRouter)

app.get('/login', (req, res)=>{
    res.render('login')
})


module.exports = app
