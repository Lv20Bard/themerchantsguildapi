var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
	name: String,
	price: Number,
	discription: String,
	tags:Array,
	updated_at: {type: Date, default: Date.now}

});


module.exports = mongoose.model('Item', ItemSchema);