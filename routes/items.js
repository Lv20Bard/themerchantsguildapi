var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })

var moongoose = require('mongoose');
var Item = require('../models/storeitem.js');

var userValidation = require('../middleware/userValidation.js');

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


// Get a specific item
router.get('/:id',function(req,res, nesxt){
	Item.findById(req.params.id,function(err,post){
		if(err){
			return err;
		}
		res.json(post);
	});
});

// Things that Require you to be logged on ***********************************

// Post an Item
router.post('/', userValidation, function(req,res,next){
	
	console.log(req.body);
	console.log(req.decoded);
	
	var item = {
		name:req.body.name,
		discription:req.body.discription,
		tags:req.body.tags,
		price:req.body.price,
		user_who_posted:req.decoded._doc._id
	}
	


	Item.create(item,function(err,post){
		if(err){
			return next(err);
		}
		res.json(post);
	});
});


// Update an Item
router.put('/:id', userValidation, function(req,res,next){
			
	Item.findById(req.params.id, function(err, post){
		
		query = { user_who_posted: req.decoded._doc._id };
		Item.update(query, req.body, function(err, post){
			if(err){
				return next(err);
			}

			res.json(post);	
		});

	}); 
});


// Delete an Item
router.delete('/:id', userValidation, function(){
	Item.findById(req.params.id, function(err, post){
		
		query = { user_who_posted: req.decoded._doc._id };
		Item.remove(query, function(err, post){
			if(err){
				return next(err);
			}

			res.json(post);	
		});

	}); 

});

// END things that require you to be logged on ********************************

module.exports = router;




































