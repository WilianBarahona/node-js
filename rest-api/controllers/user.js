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
    // User.find({email: req.body.email})
    // .then((data)=>{
    //     if(!data)
    //         return res.status(404).send({message: `El usuario no existe`})

    //     req.user = data
    //     res.status(200).send({
    //         message: `Te has logeado correctamente`,
    //         token: service.createToken(data)
    //     })
        
    // })
    // .catch((error)=>{
    //     res.status(500).send({message: error})
    // })
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
        if (!user) return res.status(404).send({ msg: `no existe el usuario: ${req.body.email}` })
    
        return user.comparePassword(req.body.password, (err, isMatch) => {
          if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
          if (!isMatch) return res.status(404).send({ msg: `Error de contraseña: ${req.body.email}` })
    
          req.user = user
          return res.status(200).send({ msg: 'Te has logueado correctamente', token: service.createToken(user) })
        });
    
    }).select('_id email +password');
}

module.exports ={
    singUp,
    singIn
}
