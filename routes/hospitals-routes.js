/**
 * Hospitales
 * ruta: '/api/hospitals'
 */

 const { Router } = require('express');
 const { check } = require('express-validator');
 
 const { validarCampos } = require('../middlewares/validar-campo');
 const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospital_controller');
//  const { getHospitals, createUser, updateUser, deleteUser } = require('../controllers/user_controller');
 const { validarJWT } = require('../middlewares/validar-jwt');
 
 const router = Router();
 
 router.get( '/', validarJWT, getHospitals );
 
 // middlewares
router.post( '/',[
    validarJWT,
    check('name', 'El nombre del hospital es obligatorio').not().isEmpty(),
    validarCampos
], createHospital );
 
 router.put( '/:id',[
     validarJWT,
     check('name', 'El nombre es obligatorio').not().isEmpty(),
     validarCampos
 ], updateHospital );
 
 router.delete( '/:id',[ 
     validarJWT,
    // check('hospital', 'El id del hospital debe ser valido').isMongoId(),
    // validarCampos
 ], deleteHospital );

 
 module.exports = router;
