const mongoose = require('mongoose');

// DB User
// nodeexpress
// 6WuFlkg3yCcJqKWM

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB Connection succsessful');
    } catch (error) {
        console.error(error);
        throw new Error('Error trying to connect');
    }
}

module.exports = {
    dbConnection
}
