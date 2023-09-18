

const { response } = require('express');
const bcryptjs  = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
// const { validationResult } = require('express-validator');
const ObjectId = require('mongoose').Types.ObjectId;

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

const getDoctorById = async (req, res) => {

    const id = req.params.id;

    try {
        const doctor = await DoctorModel.findById(id)
        .populate('hospital','name img')
        .populate('user','name img');

        res.json({
            status: 'success',
            data: {
                doctor
            }
        });
        
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Error inesperado...'
        });
    }
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
    // TODO: Validar token y comprobar su es el usuario correcto
    const id = req.params.id;
    const uid = req.uid;

    try {

        if(!isValidObjectId(id)){
            return res.status(404).json({
                status:'error',
                message: 'El id del medico debe ser valido'
            });
        }

        const doctorDB = await DoctorModel.findById( id );

        if(!doctorDB){
            return res.status(404).json({
                status:'error',
                message: 'Medico no encontrado por id'
            });
        }

        const cambiosDoctor = {
            ...req.body,
            usuario: uid
        }

        const doctorActualizado = await DoctorModel.findByIdAndUpdate( id, cambiosDoctor, { new: true });

        res.json({
            status: "success",
            data: doctorActualizado
        });

    } catch (error) {
        console.log(error);
        response.status(500).json({
            status: 'error',
            message: 'Error inesperado...'
        });
    }
}

const deleteDoctor = async (req, res = response) => {

    // res.json({
    //     status: 'success',
    //     data: "eliminarDoctor"
    // });

    // TODO: Validar token y comprobar su es el usuario correcto
    const id = req.params.id;

    try {

        if(!isValidObjectId(id)){
            return res.status(404).json({
                status:'error',
                message: 'El id del medico debe ser valido'
            });
        }

        const doctorDB = await DoctorModel.findById( id );

        if (!doctorDB) {
            return res.status(404).json({
                status:'error',
                message: 'Hospital no escontrado por id'
            });
        }

        await DoctorModel.findByIdAndDelete( id );

        res.json({
            status: 'success',
            data: "Doctor eliminado"
        });
    
    } catch (error) {
        response.status(500).json({
            status: 'error',
            message: 'Error inesperado...'
        });
    }
    
}

// Validator function
function isValidObjectId(id) {
     
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;       
        return false;
    }
    return false;
}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    getDoctorById
}