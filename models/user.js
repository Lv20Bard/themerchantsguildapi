var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: String,
	updated_at: {type: Date, default: Date.now},
	email:String,
	password:String

});


module.exports = mongoose.model('User', UserSchema);