'use strict' 
const express = require('express')
const router = express.Router()
const productCtrl = require('../controllers/product')
const userCtrl = require('../controllers/user')
const auth = require('../middleware/auth')

// Peticiones basicas
router.get('/products/',productCtrl.getProducts)
router.get('/products/:id',productCtrl.getProduct)
router.post('/products/',productCtrl.createProduct)
router.put('/products/:id',productCtrl.updateProduct)
router.delete('/products/:id',productCtrl.deleteProduct)
router.get('/private', auth, (req, res)=>{ //auth.isAuth => reemplazar solo por auth puesto que este modulo solo tiene una funcion
    //ejecuta el middleware isAuth en caso de tener un token valido, ejecutar la funcion suguiente => (req, res)=>{}
    res.status(200).send({message: `Tienes acceso`})
})
router.post('/singup', userCtrl.singUp)
router.post('/singin', userCtrl.singIn)


module.exports = router
