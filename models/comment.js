var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	user: String,
    updated_at: {type: Date, default: Date.now},
    rating: Number,
    postedOn: String,
    content: String

});


module.exports = mongoose.model('Comment', CommentSchema);