const helpers = {};
///////////este fragmento de codigo sirve para enviar mensajes 
///////////de error si la autenticacion con passport falla
helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Necesita iniciar sesion');
    res.redirect('/inicia-sesion');
};

module.exports = helpers;
