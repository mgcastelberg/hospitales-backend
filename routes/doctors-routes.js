/**
 * Doctor
 * ruta: '/api/doctor'
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campo');
const { getDoctors, createDoctor, updateDoctor, deleteDoctor, getDoctorById } = require('../controllers/doctor_controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getDoctors );
 
 // middlewares
router.post( '/',[
    validarJWT,
     check('name', 'El nombre del doctor es obligatorio').not().isEmpty(),
     check('hospital', 'El id del hospital es obligatorio').not().isEmpty(),
     check('hospital', 'El id del hospital debe ser valido').isMongoId(),
     validarCampos
], createDoctor );
 
 router.put( '/:id',[ 
     validarJWT,
//      check('name', 'El nombre es obligatorio').not().isEmpty(),
//      check('email', 'El email debe ser valido').isEmail(),
//      check('role', 'El rol es obligatorio').not().isEmpty(),
//      validarCampos
 ], updateDoctor );
 
 router.delete( '/:id',[ 
     validarJWT,
    //  validarCampos
 ], deleteDoctor );

 router.get( '/:id',[ 
     validarJWT,
    //  validarCampos
 ], getDoctorById );

 
 module.exports = router;
