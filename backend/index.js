if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();//Desplegando variables de entorno locales si 'development'
}

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

//initializations
const app = express();
require('./database');

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
//procesan todas las peticiones antes de que lleguen
app.use(morgan('dev'));//todos los middleware de express son funciones
const storage = multer.diskStorage({ //funcion para subir imagenes en el servidor
    destination: path.join(__dirname, 'public/uploads'),
    filename(req,file,cb){
        cb(null,new Date().getTime() + path.extname(file.originalname))
    }
})
app.use(multer({storage}).single('image'))
app.use(express.urlencoded({extended: false})); //interpreta datos de formulario mediante JSON
app.use(express.json()); //entiende Json y AJAX
app.use(cors());

//routes
app.use('/api/books',require('./routes/books'));//importa las rutas del server desde ubicación


//statis files
app.use(express.static(path.join(__dirname,'public')));//permite al navegador leer archivos estaticos


//start the server
app.listen(app.get('port'), () =>{
    console.log('server on port ',app.get('port'));
});