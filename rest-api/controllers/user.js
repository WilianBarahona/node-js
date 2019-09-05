//Autenticacion de usuarios
'use strict'
const User = require('../models/user')
const service = require('../services')

function singUp(req, res){
    //Registro de usuarios
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
        //avatar => este se genera a partir del email
        //password => la funcion pre ya se encarga de guardar el password
        //signupDate => por defecto se guarda la fecha actual
        //lastLogin => hasta no volverse a logear no es necesario
    })

    user.save((err) => {
         if (err) 
            return res.status(500).send({ message: `Error al crear el usuario: ${err}` })

         return res.status(201).send({ token: service.createToken(user) })
    })
}

function singIn(req, res){
    //Login
    User.find({email: req.body.email})
    .then((data)=>{
        if(!data)
            return res.status(404).send({message: `El usuario no existe`})

        req.user = data
        res.status(200).send({
            message: `Te has logeado correctamente`,
            token: service.createToken(user)
        })
        
    })
    .catch((error)=>{
        res.status(500).send({message: error})
    })
}

module.exports ={
    singUp,
    singIn
}
