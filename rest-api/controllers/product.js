'use strict'

const product = require('../models/product') //importar el schema product

// CRUD
function createProduct(req, res){
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
}

function getProducts(req, res){
    product.find()
    .then((data)=>{
        if(!data)
            return res.status(404).send({message:`No existen productos`})
        
        res.status(200).send({data})
    })
    .catch((error)=>{
        if(error)
            return res.status(500).send({error})
    })
}

function getProduct(req, res){
    product.findById(req.params.id) 
    .then((data)=>{
        if (!data)
          return res.status(404).send({message: `El producto ${productId} no existe`, error: true})

        res.status(200).send({data}) // {data: data} => se puede reducir con ES6 a {data}
    })
    .catch((error)=>{
        if(error) 
            return res.status(500).send({error})
    })
}

function updateProduct(req, res){
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
}

function deleteProduct(req, res){
    product.remove({_id: req.params.id}) 
    .then((data)=>{
        res.status(200).send({data}) 
    })
    .catch((error)=>{
        if(error) 
            return res.status(500).send({error})
    }) 
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}
