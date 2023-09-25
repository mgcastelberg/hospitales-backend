require('dotenv').config();
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { dbConnection } = require('./database/config');

const app = express();

// Configurar cors
app.use(cors());

// Carpeta publica
app.use( express.static('public') );

// Lectura y parseo del body
// app.use( express.json() );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB conection
dbConnection();
// console.log(process.env);

// Rutas
// app.get('/', (req, res) => {

//     res.status(400).json({
//         status: 'success',
//         message: 'Hola Mundo'
//     });

// });

// Rutas
app.use('/api/users', require('./routes/users-routes'));
app.use('/api/login', require('./routes/auth-routes'));
app.use('/api/hospitals', require('./routes/hospitals-routes'));
app.use('/api/doctors', require('./routes/doctors-routes'));
app.use('/api/todo', require('./routes/searches-routes'));
app.use('/api/upload', require('./routes/uploads-routes'));


// Lo último
app.get('*',(req,res) => {
    res.sendFile(path.resolve( __dirname, 'public/index.html'));
});

// app.get('/api/users', (req, res) => {
//     res.json({
//         status: 'success',
//         data: [
//             {
//                 id: 123,
//                 nombre: 'Fernando'
//             }
//         ]
//     });
// });

app.listen( process.env.PORT, () => {
    console.log('Servidor Corriendo Tower en puerto ' + process.env.PORT);
});