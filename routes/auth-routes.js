/**
 *  Ruta: /api/auth
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth_controller');
const { validarCampos } = require('../middlewares/validar-campo');

const router = Router();

router.post('/',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login );







module.exports = router;