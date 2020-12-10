require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send('<app-barra-lateral></app-barra-lateral>');
});

app.use(require('./routes/usuarios'));
app.use(require('./routes/prestamos'));
app.use(require('./routes/libros'));
mongoose.connect('mongodb://localhost:27017/biblioteca',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false

}, (err, res) => {
    if (err) throw err;
     console.log('base de datos ONLINE')
});

app.listen(process.env.PORT, () => {
    console.log('el servidor esta en linea por el puerto ', process.env.PORT);
});