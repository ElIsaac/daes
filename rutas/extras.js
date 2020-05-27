const { Router } = require('express');
const router = Router();

router.get('/acerca-de', (req, res)=>{
    res.render('extras/acerca-de', {titulo_pagina: "Acerca de"})
});

router.get('/comic', (req, res)=>{
    res.render('extras/comic', {titulo_pagina: "Comic"})
});

module.exports = router;