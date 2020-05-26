const mongoose=require('mongoose');

//configuracion de mongoose
mongoose.connect('mongodb://localhost/noticias-tecnologia',{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(db => console.log('base de datos conectada')).catch(err => console.log(err));