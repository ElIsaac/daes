const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/noticias-tecnologia',{
    //mongodb+srv://isaac:isaac@cluster-isaac-eijcl.mongodb.net/test?retryWrites=true&w=majority
    //mongodb://localhost/noticias
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(db => console.log('base de datos conectada')).catch(err => console.log(err));