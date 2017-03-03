var express = require('express');
var router = express.Router();

var moongoose = require('mongoose');
var Item = require('../models/storeitem.js');

// Get All Items
router.get('/',function(req, res, next){
	Item.find(function(err, items){
		if(err){
			return(next(err));
		}

		res.json(items);

	});
});

// Search For Items by tags (Exact Search)
router.get('/search', function(req, res){
	Item.find( { tags: { $in: req.body.tags } } , function(err, post){

		if(err){
			return err;
		}
		res.json(post);
	});

});

router.get('/exactsearch', function(req, res){
	Item.find( { tags: { $all: req.body.tags } } , function(err, post){

		if(err){
			return err;
		}
		res.json(post);
	});

});


// Post an Item
router.post('/', function(req,res,next){
	Item.create(req.body,function(err,post){
		if(err){
			return next(err);
		}
		res.json(post);
	});
});


// Get a specific item
router.get('/:id',function(req,res, nesxt){
	Item.findById(req.params.id,function(err,post){
		if(err){
			return err;
		}
		res.json(post);
	});
});




// Update an Item
router.put('/:id', function(req,res,next){
	Item.findByIdAndUpdate(req.params.id, req.body, function(err, post){
		if(err){
			return next(err);
		}
		res.json(post);
	});
});


// Delete an Item
router.delete('/:id',function(){
	Item.findByIdAndRemove(req.params.id, req.body, function(err,post){
		if(err){
			return next(err);
		}
		res.json(post);
	});

});


module.exports = router;




































