

const { response } = require('express');
const bcryptjs  = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
// const { validationResult } = require('express-validator');

const UserModel = require('../models/usuario');

const getUser = (req, res) => {

    // Obtain query strings
    let page = req.query.page;
    let limit = req.query.limit;

    res.json({
        status: 'success',
        data: {
            users: [
                {
                    id: 123,
                    nombre: 'Fernando',
                    page,
                    limit
                }
            ]
        }
    });
};

const getUsers = async (req, res) => {

    const page = Number(req.query.page) || 0;
    const per_page = Number(req.query.per_page) || 5;
    const desde = ( page - 1 ) * per_page;
    
    // const usuarios = await UserModel.find();
    // const usuarios = await UserModel.find({}, 'name email role google');
    // const usuarios = await UserModel.find({}, 'name email role google')
    //                                 .skip( desde )
    //                                 .limit( per_page );
    // const total = await UserModel.count();
    
    const [usuarios, total ] = await Promise.all([
        UserModel.find({}, 'name email role google img')
        .skip( desde )
        .limit( per_page ),
        UserModel.countDocuments()
    ]);
    // UserModel.count()
    
    const total_pages = Math.ceil(total / per_page);

    res.json({
        status: 'success',
        data: {
            users: usuarios,
            paginate: {
                total,
                per_page,
                current_page: page,
                total_pages
            }
        }
    });
};

const createUser = async (req, res = response) => {
    // lo pasamos al middleware
    // const errores = validationResult(req);
    // if( !errores.isEmpty() ){
    //     return res.status(400).json({
    //         status: 'error',
    //         errores: errores.mapped()
    //     });
    // }


    try {
        // Primero buscamos si existe el correo
        const {name, password, email} = req.body;
        const existeEmail = await UserModel.findOne({ email });

        if ( existeEmail ) {
            return res.status(400).json({
                status: 'error',
                message: 'El correo ya esta registrado'
            });
        }

        const usuario = new UserModel( req.body );

        // Antes de grabar en la base de datos Encriptar Contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password );

        // Guardar usuario
        await usuario.save();

        // Generar el TOKEN JWT
        const token = await generarJWT(usuario.id);

        res.json({
            status: 'success',
            data: {
                token,
                usuario
            }
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Error inesperado...'
        });
    }

};


const updateUser = async (req, res = response) => {

    // TODO: Validar token y comprobar su es el usuario correcto
    const uid = req.params.id;

    try {

        // console.log(uid);
        // const usuarioDB = await UserModel.findById( uid );
        const usuarioDB = await UserModel.findOne({ uid });

        if(!usuarioDB){
            return res.status(404).json({
                status:'error',
                message: 'No existe un usuario por ese id'
            });
        }

        // // Actualizacion
        // const campos = req.body;
        const {password, google, email, ...campos} = req.body;
        // console.log(campos.email);
        if (usuarioDB.email !== email) {
            const existeEmail = await UserModel.findOne({ email });
            if( existeEmail ){
                return res.status(400).json({
                    status: 'error',
                    message: 'Ya existe un usuario con ese Email'
                });
            }
        }

        // // lo quitamos con la desestructuracion
        // delete campos.password;
        // delete campos.google;

        campos.email = email;
        const usuarioActualizado = await UserModel.findByIdAndUpdate( uid, campos, { new: true });

        res.json({
            status: "success",
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        response.status(500).json({
            status: 'error',
            message: 'Error inesperado...'
        });
    }
}

const deleteUser = async (req, res = response) => {

    const uid = req.params.id;

    try {
        // uid
        const usuarioDB = await UserModel.findById( uid );
        if(!usuarioDB){
            return res.status(404).json({
                status:'error',
                message: 'No existe un usuario por ese id'
            });
        }

        await UserModel.findByIdAndDelete( uid );

        res.json({
            status: "success",
            data: "Usuario eliminado"
            
        });
    
    } catch (error) {
        response.status(500).json({
            status: 'error',
            message: 'Error inesperado...'
        });
    }
    
}

module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser
}