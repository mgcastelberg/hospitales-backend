const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({

    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
// si se desea dar otro nombre a la tabla
// }, {collection:'hospitales'});

HospitalSchema.method('toJSON', function() {
    //Extraemos la versión en la instancia del objeto
    const { __v, ...object} = this.toObject();
    return object;
}); 

module.exports = model('Hospital', HospitalSchema);