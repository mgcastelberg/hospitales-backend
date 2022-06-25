
const { response } = require('express');
const bcryptjs  = require('bcryptjs');
const UserModel = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {

        const usuariosDB = await UserModel.findOne({ email });

        if ( !usuariosDB ) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario invalido'
            });
        }

        // verificar contraseña
        const validPassword = bcryptjs.compareSync( password, usuariosDB.password );

        if (!validPassword) {
            return res.status(404).json({
                status: 'error',
                message: 'Credenciales invalidas'
            });
        }

        // Generar el TOKEN JWT
        const token = await generarJWT(usuariosDB.id);

        res.json({
            status: 'success',
            data: {
                token
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Hable con el administrador'
        });
    }

}

module.exports = {
    login
};