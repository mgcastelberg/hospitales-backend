

/**
 *  Ruta: /api/apiusers
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campo');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/user_controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getUsers );
// router.post( '/', createUser );

// middlewares
router.post( '/',[ 
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email debe ser valido').isEmail(),
    validarCampos
], createUser );

router.put( '/:id',[ 
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email debe ser valido').isEmail(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    validarCampos
], updateUser );

router.delete( '/:id',[ 
    validarJWT,
    validarCampos
], deleteUser );


// router.get('/', (req, res) => {
//     res.json({
//         status: 'success',
//         data: [
//             {
//                 id: 123,
//                 nombre: 'Fernando'
//             }
//         ]
//     });
// });




module.exports = router;