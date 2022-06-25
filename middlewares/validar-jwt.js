
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res, next ) => {

    // Leer el Token
    const token = req.header('x-token');

    // console.log(token);

    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'No hay token en la peticion'
        });
    }

    // console.log(process.env.JWT_SECRET)

    try {

        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            status: 'error',
            message: 'Token incorrecto'
        });
    }

}

module.exports = {
    validarJWT
}