const passport=require('passport');
const localStrategy= require('passport-local').Strategy

///requerimos traer el modelo de datos con el que guardamos los usuarios

const Usuario = require('../models/Usuario');

passport.use(new localStrategy({
    usernameField:'email',
    passwordField: 'contrasenia'},
    async (email, contrasenia, done)=>{
        const usuario=await Usuario.findOne({email});//consultamos a mongodb 
        if(!usuario){//si el usuario existe
            return done(null, false, {message: 'Usuario no encontrado'});
        }
            const usuarioEncontrado= await usuario.matchPassword(contrasenia);
            if(usuarioEncontrado){//si el usuario existe y la contraseña es correcta
                return done(null, usuario)
            }
            else{//si el usuario existe pero la contraseña es incorrecta
                return done(null, false, {message: 'Contraseña incorrecta'})
            } 
            
        
    }
));
/////////////se guarda el usuario en una sesion//////
passport.serializeUser((usuario, done) =>{
    done(null, usuario._id);
});
////////////se elimina el usuario de la sesion//////
passport.deserializeUser((id, done) => {
    Usuario.findById(id, (err, usuario) => {
      done(err, usuario);
    });
});