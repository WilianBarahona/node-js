'use strict' 
const express = require('express')
const router = express.Router()
const productCtrl = require('../controllers/product')
const auth = require('../middleware/auth')

// Peticiones basicas
router.get('/',productCtrl.getProducts)
router.get('/:id',productCtrl.getProduct)
router.post('/',productCtrl.createProduct)
router.put('/:id',productCtrl.updateProduct)
router.delete('/:id',productCtrl.deleteProduct)
router.get('/private', auth, (req, res)=>{ //auth.isAuth => reemplazar solo por auth puesto que este modulo solo tiene una funcion
    //ejecuta el middleware isAuth en caso de tener un token valido, ejecutar la funcion suguiente => (req, res)=>{}
    res.status(200).send({message: `Tienes acceso`})
})

module.exports = router
