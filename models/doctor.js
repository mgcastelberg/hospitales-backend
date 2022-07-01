const { Schema, model } = require('mongoose');

const DoctorSchema = Schema({

    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

DoctorSchema.method('toJSON', function() {
    //Extraemos la versión en la instancia del objeto
    const { __v, ...object} = this.toObject();
    return object;
});

module.exports = model('Doctor', DoctorSchema);