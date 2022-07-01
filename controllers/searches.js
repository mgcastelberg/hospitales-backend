

const { response } = require('express');
const { generarJWT } = require('../helpers/jwt');

const Usuario = require('../models/usuario');
const Medico = require('../models/doctor');
const Hospital = require('../models/hospital');

const getTodo = async (req, res ) => {

    // Get query strings
    const filter = req.params.filter;
    const regex = RegExp(filter, 'i');
    // console.log(regex);

    // const usuarios = await Usuario.find({name: regex});
    // const doctores = await Medico.find({name: regex});
    // const hospitales = await Hospital.find({name: regex});

    const [usuarios, doctores, hospitales] = await Promise.all([
        Usuario.find({name: regex}),
        Medico.find({name: regex}),
        Hospital.find({name: regex})        
    ]);

    res.json({
        status: 'success',
        data: {
            usuarios,
            doctores,
            hospitales
        }
    });
};

const getColeccion = async (req, res ) => {

    // Get query strings
    const tabla = req.params.tabla;
    const filter = req.params.filter;
    const regex = RegExp(filter, 'i');

    console.log(tabla);

    let data = [];

    switch (tabla) {
        case 'medicos':
                data = await Medico.find({name: regex})
                                   .populate('hospital', 'name img')
                                   .populate('user', 'name img');
            break;
        case 'hospitales':
                data = await Hospital.find({name: regex})
                                     .populate('user', 'name img');
            break;
        case 'usuarios':
                data = await Usuario.find({name: regex});
            break;
        default:
            return res.status(400).json({
                status: 'error',
                message: 'La tabla debe ser usuarios/medicos/hospitales'
            })
            break;
    }

    res.json({
        status: 'success',
        data
    });
};


module.exports = {
    getTodo,
    getColeccion
}