

const { response } = require('express');
const bcryptjs  = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
// const { validationResult } = require('express-validator');

const HospitalModel = require('../models/hospital');

const getHospital = (req, res ) => {

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

const getHospitals = async (req, res) => {

    // const usuarios = await UserModel.find();
    // const hospitals = await HospitalModel.find({}, 'name email role google');
    const hospitals = await HospitalModel.find().populate('user','name img');

    res.json({
        status: 'success',
        data: {
            hospitals
        }
    });
};

const createHospital = async (req, res = response) => {

    // const hospital = new HospitalModel( req.body );
    const uid = req.uid;
    const hospital = new HospitalModel({ user:uid, ...req.body });
    console.log(uid);
    
    try {            
        // Guardar hospital
        const hospitalDB = await hospital.save();

        res.json({
            status: 'success',
            data: {
                hospitalDB
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


const updateHospital = async (req, res = response) => {

    res.json({
        status: 'success',
        data: "updateHospital"
    });

    // TODO: Validar token y comprobar su es el usuario correcto
    // const uid = req.params.id;

    // try {

    //     // console.log(uid);
    //     // const usuarioDB = await UserModel.findById( uid );
    //     const usuarioDB = await UserModel.findOne({ uid });

    //     if(!usuarioDB){
    //         return res.status(404).json({
    //             status:'error',
    //             message: 'No existe un usuario por ese id'
    //         });
    //     }

    //     // // Actualizacion
    //     // const campos = req.body;
    //     const {password, google, email, ...campos} = req.body;
    //     // console.log(campos.email);
    //     if (usuarioDB.email !== email) {
    //         const existeEmail = await UserModel.findOne({ email });
    //         if( existeEmail ){
    //             return res.status(400).json({
    //                 status: 'error',
    //                 message: 'Ya existe un usuario con ese Email'
    //             });
    //         }
    //     }

    //     // // lo quitamos con la desestructuracion
    //     // delete campos.password;
    //     // delete campos.google;

    //     campos.email = email;
    //     const usuarioActualizado = await UserModel.findByIdAndUpdate( uid, campos, { new: true });

    //     res.json({
    //         status: "success",
    //         usuario: usuarioActualizado
    //     });

    // } catch (error) {
    //     console.log(error);
    //     response.status(500).json({
    //         status: 'error',
    //         message: 'Error inesperado...'
    //     });
    // }
}

const deleteHospital = async (req, res = response) => {

    res.json({
        status: 'success',
        data: "eliminarHospital"
    });

    // const uid = req.params.id;

    // try {
    //     // uid
    //     const usuarioDB = await UserModel.findById( uid );
    //     if(!usuarioDB){
    //         return res.status(404).json({
    //             status:'error',
    //             message: 'No existe un usuario por ese id'
    //         });
    //     }

    //     await UserModel.findByIdAndDelete( uid );

    //     res.json({
    //         status: "success",
    //         data: "Usuario eliminado"
            
    //     });
    
    // } catch (error) {
    //     response.status(500).json({
    //         status: 'error',
    //         message: 'Error inesperado...'
    //     });
    // }
    
}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}