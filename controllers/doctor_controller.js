

const { response } = require('express');
const bcryptjs  = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
// const { validationResult } = require('express-validator');

const DoctorModel = require('../models/doctor');

const getDoctor = (req, res ) => {

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

const getDoctors = async (req, res) => {

    // const usuarios = await UserModel.find();
    const doctors = await DoctorModel.find()
                                     .populate('hospital','name img')
                                     .populate('user','name img');

    res.json({
        status: 'success',
        data: {
            doctors
        }
    });
};

const createDoctor = async (req, res = response) => {

    const uid = req.uid;
    const doctor = new DoctorModel({ user:uid, ...req.body });
    
    try {            
        // Guardar doctor
        const doctorDB = await doctor.save();

        res.json({
            status: 'success',
            data: {
                doctorDB
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


const updateDoctor = async (req, res = response) => {

    res.json({
        status: 'success',
        data: "updateDoctor"
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

const deleteDoctor = async (req, res = response) => {

    res.json({
        status: 'success',
        data: "eliminarDoctor"
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
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
}