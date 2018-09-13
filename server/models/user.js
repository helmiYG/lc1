var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSc = new Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, min: 6}
})

var Users = mongoose.model('Users', userSc);
module.exports = Users
