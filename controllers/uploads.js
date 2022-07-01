const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');




const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    // validar tipo
    const tiposValidos = ['hospitals', 'doctors', 'users'];
    if (!tiposValidos.includes(tipo)) {
       return res.status(400).json({
        status: "error",
        message: "El tipo debe ser hospitals, doctors o users"
       });
    }

    // Validar que venga un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            status: 'error',
            message: 'No subio ningun archivo.'
        });
    }

    // Procesar la imagen
    const file = req.files.imagen;
    // console.log(file);

    const nombreCortado = file.name.split('.');
    const extensionFile = nombreCortado[ nombreCortado.length -1];
    
    
    // Validar extension
    const extensionValida = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionValida.includes(extensionFile)) {
        return res.status(400).json({
         status: "error",
         message: "El tipo debe ser png, jpg, jpeg ó gif"
        });
     }

    //  Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionFile }`;

    // Path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;
    file.mv( path, (err) => {
        if (err){
            console.log(err);
            return res.status(500).json({
              status: "error",
              message: "Error al mover la imagen"
             });
        }

        // Actualizar base de datos
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            status:"success",
            data: {
                message: `Archivo ${ tipo } subido correctamente`,
                nombreArchivo
            }
        });
      });    
}

const retornaImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${tipo}/${ foto }` );

    // imagen por defecto
    if (fs.existsSync( pathImg )) {
        res.sendFile( pathImg );
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg` );
        res.sendFile( pathImg );
    }
}

module.exports = {
    fileUpload,
    retornaImagen
}