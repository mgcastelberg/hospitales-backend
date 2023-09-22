
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = ( req, res, next ) => {

    // Leer el Token
    const token = req.header('x-token');
    // console.log(token);

    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'No hay token en la peticion'
        });
    }

    // console.log(process.env.JWT_SECRET)

    try {

        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            status: 'error',
            message: 'Token incorrecto'
        });
    }

}

// middleware valida admin
const validarADMIN_ROLE = async (req, res, next) => {

    const uid = req.uid;

    try {

        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no existe'
            });
        }

        if (usuarioDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                status: 'error',
                message: 'No tiene privilegios para realizar la operación'
            }); 
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            status: 'error',
            message: 'Hable como el administrador'
        });
    }
}

const validarADMIN_ROLE_O_MismoUsuario = async (req, res, next) => {

    const uid = req.uid;
    const id = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no existe'
            });
        }

        if (usuarioDB.role === 'ADMIN_ROLE' || uid === id) {
            next();
        } else {
            return res.status(403).json({
                status: 'error',
                message: 'No tiene privilegios para realizar la operación'
            }); 
        }        

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            status: 'error',
            message: 'Hable como el administrador'
        });
    }
}

module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_O_MismoUsuario
}