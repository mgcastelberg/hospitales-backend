/**
 * searches
 * ruta: '/api/todo/:busqueda'
 */

 const { Router } = require('express');

 const { getTodo, getColeccion } = require('../controllers/searches');
 const { validarJWT } = require('../middlewares/validar-jwt');
 
 const router = Router();
 
 // middlewares 
 router.get( '/:filter',[ 
     validarJWT
 ], getTodo );

 router.get( '/coleccion/:tabla/:filter',[ 
    validarJWT
], getColeccion );
 
 module.exports = router;
