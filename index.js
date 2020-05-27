const express = require('express');               //Framework para facilitar la creacion de servidores
const app = express();                            //instancia de express
const path = require('path');                     //libreria para facilitar el uso de rutas en windows, linux y mac
const exphbs =require('express-handlebars');      // motor de pkantillas para facilitar el uso de htmls y css
const methodOverride=require('method-override');  //manera de implementar los tipos de metodos http (en este caso put y delete)
const flash = require('connect-flash');           // la utilizamos en el envio de mensajes usando passport
const passport=require('passport');               //manera de autenticar usuarios 
const session = require('express-session')        // manera de almacenar el usuario anterior en sesiones

/////////////////////////////////configuraciones///////////////////////////
app.set('port', 4000); //puerto del servidor, process.env es la variable de entorno del 
                            //puerto que nos otorga un hosting(si es que lo utilizamos)

app.set('views', path.join(__dirname, 'views'));//asignacion de la carpeta donde se encuentran los archivos html
app.engine('.hbs', exphbs({//configuracion del motor de plantillas
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'plantillas'),
    partialsDir: path.join(app.get('views'), 'fragmentos'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//middlewares
app.use(express.urlencoded({ extended: false })); //manera de recibir objetos json de las views
app.use(methodOverride('_method')); //uso de los distintos metodos http

  app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  require('./config/passport')
  app.use(flash());
//variables locales
 app.use((req, res, next) => {
    res.locals.succes_msg = req.flash('succes_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user;
    next();
}); 

//rutas
app.use(require('./rutas/noticias'));
app.use(require('./rutas/usuarios'));
app.use(require('./rutas/extras'));
//static
app.use(express.static(path.join(__dirname, 'public')));

//bd
require('./coneccion-mongoDB');
//servidor
app.listen(app.get('port'), () => {
    console.log('servidor en puerto', app.get('port'))
});