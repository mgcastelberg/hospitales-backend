

const { response } = require('express');
const bcryptjs  = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const ObjectId = require('mongoose').Types.ObjectId;

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
    // TODO: Validar token y comprobar su es el usuario correcto
    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospitalDB = await HospitalModel.findById( id );

        if(!hospitalDB){
            return res.status(404).json({
                status:'error',
                message: 'No existe un usuario por ese id'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await HospitalModel.findByIdAndUpdate( id, cambiosHospital, { new: true });

        res.json({
            status: "success",
            data: hospitalActualizado
        });

    } catch (error) {
        console.log(error);
        response.status(500).json({
            status: 'error',
            message: 'Error inesperado...'
        });
    }
}

const deleteHospital = async (req, res = response) => {
    // TODO: Validar token y comprobar su es el usuario correcto
    const id = req.params.id;

    try {

        if(!isValidObjectId(id)){
            return res.status(404).json({
                status:'error',
                message: 'El id del hospital debe ser valido'
            });
        }

        const hospitalDB = await HospitalModel.findById( id );

        if (!hospitalDB) {
            return res.status(404).json({
                status:'error',
                message: 'Hospital no escontrado por id'
            });
        }

        await HospitalModel.findByIdAndDelete( id );

        res.json({
            status: 'success',
            data: "Hospital eliminado"
        });
    
    } catch (error) {
        response.status(500).json({
            status: 'error',
            message: 'Error inesperado...'
        });
    }
}


// const dump = async (req, res = response) => {

//     let responsex = JSON.stringify(req);
//     return res.json({
//         responsex
//     });

// }

// Validator function
function isValidObjectId(id){
     
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;       
        return false;
    }
    return false;
}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}