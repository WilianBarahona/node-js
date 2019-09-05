//Autenticacion de usuarios
'use strict'
const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')

function singUp(req, res){
    //Registro de usuarios
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        //avatar => este se genera a partir del email
        //password => la funcion pre ya se encarga de guardar el password
        //signupDate => por defecto se guarda la fecha actual
        //lastLogin => hasta no volverse a logear no es necesario
    })

    user.save()
    .then((data)=>{
        res.status(200).send({token: service.createToken(user)});
    })
    .catch((error)=>{
        res.status(500).send({error})
    });
}

function singIn(req, res){
    //registrar
}

module.exports ={
    singUp,
    singUp
}
