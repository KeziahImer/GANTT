const mangoose = require('mangoose');
const uniqueValidator = require('mangoose-unique-validator')

const userSchema = mangoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mangoose.model('User', userSchema);
