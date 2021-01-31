const bcryptjs = require('bcryptjs');

const { Schema, model } = require('mongoose');

//MODEL PAGE
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Number
    }
});

//ENCRIPTANDO 
UserSchema.methods.encryPass = async (password) => {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
}

//DESENCRIPTANDO
UserSchema.methods.macthPass = async function (password) {
    return await bcryptjs.compare(password, this.password);
}

module.exports = model('User', UserSchema);