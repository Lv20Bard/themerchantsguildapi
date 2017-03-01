var mongoose = require('mongoose');

var RequestSchema = new mongoose.Schema({
	name: String,
	budget: Number,
	discription: String,
	tags:Array,
	updated_at: {type: Date, default: Date.now}

});


module.exports = mongoose.model('request', RequestSchema);