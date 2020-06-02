const { Router } = require('express');
const router = Router();
const Usuario = require('../models/Usuario')
const passport = require('passport')

//metodo get del inicio de sesion
router.get('/inicia-sesion', (req, res) => {
    res.render('usuarios/inicia-sesion', { titulo_pagina: 'Inicia sesion' });
});

//metodo post para iniciar sesion, todo esto lo hace passport
router.post('/inicia-sesion', passport.authenticate('local',{
    successRedirect: '/', //si el inicio de sesion es correcto se redirigira a la ruta inicial '/'
    failureRedirect: '/inicia-Sesion', //si falla se redirigira hacia '/inicioDeSesion'
    badRequestMessage: 'No lleno los campos',
    failureFlash: true //'marca en verdadero el uso de mensajes flash'
}));


//metodo get del registro de usuarios
router.get('/registrate', (req, res) => {
    res.render('usuarios/registrate', { titulo_pagina: 'Registrate' });
});

//metodo post para crear usuarios
router.post('/registrate', async (req, res) => {
    const { email, nombre, apellidos, contrasenia, confirmaContrasenia } = req.body; //
    const errores = []; //arreglo de posibles errores
    if (req.body.nombre === '' || req.body.email === '' || req.body.contrasenia === '' || req.body.confirmaContrasenia === '') {
        errores.push({ text: 'llene los campos' })//se agrega un  elemento
    }
    if (req.body.contrasenia != req.body.confirmaContrasenia) {
        errores.push({ text: 'Las contraseñas no son iguales' })
    }
    if (req.body.contrasenia.length < 4) {
        errores.push({ text: 'Su contraseña debe de ser mayor a 4 caracteres' })
    }
    if (errores.length > 0) {//si hay mas de un error se renderizaran los errores
        res.render('usuarios/registrate', {
            errores
        });
    }
    else {
        var nuevoUsuario = new Usuario({
            nombre,
            apellidos,
            email,
            contrasenia
        });
        //Encriptacion de la base de datos
        nuevoUsuario.contrasenia = await nuevoUsuario.encriptacion(contrasenia);
        //guardado de datos en mongodb
        await nuevoUsuario.save();
        req.flash('succes_msg', 'Usuario Creado');
        res.redirect('/inicia-sesion');
    }
});

//metodo get del cierre de sesion
router.get('/cerrar-sesion', (req, res)=>{
    req.logOut();
    res.redirect('/');
    
})

module.exports = router;