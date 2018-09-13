var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var qSc = new Schema({
    likes: [],
    status: {type: String, required: true},
    user: { type: Schema.Types.ObjectId, ref: 'Users' }
})

var Quotes = mongoose.model('Quotes', qSc);
module.exports = Quotes
