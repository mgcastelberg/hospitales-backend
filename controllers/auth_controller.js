
const { response } = require('express');
const bcryptjs  = require('bcryptjs');
const UserModel = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn =  async( req, res = response ) => {

    const { token } = req.body;
    try {
        // const googleUser = await googleVerify( req.body.token ); //todo
        const { email, name, picture } = await googleVerify( req.body.token ); //todo

        const usuarioDB = await UserModel.findOne({ email });
        let usuario;

        if ( !usuarioDB ) {
            usuario = new UserModel({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        // guardar usuario
        await usuario.save();

        // Generar el TOKEN JWT
        const token = await generarJWT(usuario.id);

        res.json({
            status: 'success',
            data: {
                email, name, picture,
                token
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Token de Google no es valido'
        });
    }
}

const renewToken = async (req, res = response) => {

    const uid = req.uid;
    const token = await generarJWT( uid );

    res.json({
        status: 'success',
        data: {
            token
        }
    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
};