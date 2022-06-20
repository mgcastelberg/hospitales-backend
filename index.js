require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

const app = express();

// Configurar cors
app.use(cors());

// DB conection
dbConnection();
// console.log(process.env);

// Rutas
app.get('/', (req, res) => {

    res.status(400).json({
        status: 'success',
        message: 'Hola Mundo'
    });

});

app.listen( process.env.PORT, () => {
    console.log('Servidor Corriendo Tower en puerto ' + process.env.PORT);
});