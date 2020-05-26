const {Router}=require('express');
const router=Router();
const Noticia = require('../models/Noticia');
const { isAuthenticated } = require('../helpers/auth');//metodo para autenticar a los usuarios

//se me olvido hacer la ruta inicial asi que mejor hice un redirect a inicio xd
router.get('/', (req, res)=>{
    res.redirect('/inicio');
});

//metodo get para ver la vista de agregar noticias
router.get('/agregar', isAuthenticated, (req, res)=>{
    res.render('noticias/agregar', {titulo_pagina: 'Agregar Noticias'})
});

//este es el metodo post con el que se guardan las noticias
router.post('/agregar', isAuthenticated, async (req, res)=>{
    const errores=[];//en este arreglo se almacenan los errores que pueden haber
    try{
        const nuevaNoticia=new Noticia({ //modelo a guardar en mongo
            titulo: req.body.titulo,
            contenido: req.body.contenido,
            usuarioOriginal: req.user.nombre+" "+req.user.apellidos,
            usuarioFinal: req.user.nombre+" "+req.user.apellidos,
            fuente: req.body.fuente,
            fecha: Date.now()

        });
        await nuevaNoticia.save();//metodo para guardar la noticia
        res.redirect('/inicio');
    }catch(err){
        errores.push({ text: err })
        res.render('noticias/agregar', { //si hay un  error se renderizara esta vista con los errores del arreglo anterior
            errores
        });
    }
});

//metodo get para ver tooodas las noticias
router.get('/inicio', async (req, res)=>{
    const noticias= await Noticia.find().sort({ fecha: "desc" }).lean();//consulta a mongodb
    res.render('noticias/inicio', {titulo_pagina: 'Inicio', noticias})//renderizado de la vista con las noticias que consultamos anteriormente
});

//metodo get para ver solo una noticia
router.get('/noticia/:id', isAuthenticated, async (req, res)=>{
    const noticia = await Noticia.findByIdAndUpdate(req.params.id).lean();
    res.render('noticias/editar', noticia)
});

//metodo put para editar la noticia
router.put('/noticia/:id', isAuthenticated, async (req, res)=>{
    const {titulo, contenido, fuente} = req.body; 
    const usuarioFinal=req.user.nombre+" "+req.user.apellidos;
    await Noticia.findByIdAndUpdate(req.params.id, { titulo, contenido, usuarioFinal, fuente });
    res.redirect('/inicio')
});

//metodo delete para eliminar la noticia
router.delete('/noticia/:id', isAuthenticated, async (req, res)=>{
    await Noticia.findByIdAndDelete(req.params.id);
    res.redirect('/inicio');
});
module.exports = router;