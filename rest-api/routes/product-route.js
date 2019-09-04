'use strict' 
const express = require('express')
const router = express.Router()
const productCtrl = require('../controllers/product')

// Peticiones basicas
router.get('/',productCtrl.getProducts)
router.get('/:id',productCtrl.getProduct)
router.post('/',productCtrl.createProduct)
router.put('/:id',productCtrl.updateProduct)
router.delete('/:id',productCtrl.deleteProduct)

module.exports = router
