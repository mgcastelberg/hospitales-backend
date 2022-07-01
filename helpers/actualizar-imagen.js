
const fs = require('fs');

const Usuario = require('../models/usuario');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const borrarImagen = ( path) => {
    if (fs.existsSync( path )) {
        // borrar la imagen
        fs.unlinkSync( path );
    }
}

const actualizarImagen = async (tipo, id, nombreArchivo) => {
    
    // 'hospitals', 'doctors', 'users'
    let pathViejo = "";

    switch (tipo) {
        case 'doctors':
                const medico = await Doctor.findById(id);
                if (!medico) {
                    console.log('Noexiste id del medico');
                    return false;
                }

                pathViejo = `./uploads/doctors/${ medico.img }`;
                borrarImagen( pathViejo );

                medico.img = nombreArchivo;
                await medico.save();
                return true;

            break;
        case 'hospitals':
                const hospital = await Hospital.findById(id);
                if (!hospital) {
                    console.log('Noexiste id del hospital');
                    return false;
                }

                pathViejo = `./uploads/hospitals/${ hospital.img }`;
                borrarImagen( pathViejo );

                hospital.img = nombreArchivo;
                await hospital.save();
                return true;
            break;
        case 'users':
                const usuario = await Usuario.findById(id);
                if (!usuario) {
                    console.log('Noexiste id del usuario');
                    return false;
                }

                pathViejo = `./uploads/users/${ usuario.img }`;
                borrarImagen( pathViejo );

                usuario.img = nombreArchivo;
                await usuario.save();
                return true;
            break;
    
        default:
            break;
    }


    console.log('vamos bien');

}


module.exports = {
    actualizarImagen
}