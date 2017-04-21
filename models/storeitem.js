var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
	userID: String,
	name: String,
	price: Number,
	discription: String,
	tags:Array,
	updated_at: {type: Date, default: Date.now},
	user_who_posted:String

});


module.exports = mongoose.model('Item', ItemSchema);