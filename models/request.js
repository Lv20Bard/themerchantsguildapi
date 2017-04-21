var mongoose = require('mongoose');

var RequestSchema = new mongoose.Schema({
	userID: String,
	name: String,
	budget: Number,
	discription: String,
	tags:Array,
	updated_at: {type: Date, default: Date.now},
	user_who_posted:String


});


module.exports = mongoose.model('request', RequestSchema);