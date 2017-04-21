var express = require('express');
var router = express.Router();

var moongoose = require('mongoose');
var Request = require('../models/request.js');

var userValidation = require('../middleware/userValidation');


// Get Requests
router.get('/',function(req, res, next){
	Request.find(function(err, requests){
		if(err){
			return(next(err));
		}

		res.json(requests);

	});
});


// Search For Items by tags (Exact Search)
router.get('/search', function(req, res){
	Request.find( { tags: { $in: req.body.tags } } , function(err, post){

		if(err){
			return err;
		}
		res.json(post);
	});

});


router.get('/exactsearch', function(req, res){
	Request.find( { tags: { $all: req.body.tags } } , function(err, post){

		if(err){
			return err;
		}
		res.json(post);
	});

});


//Get specific Request
router.get('/:id',function(req,res,next){
	Request.findById(req.params.id,function(err,post){
		if(err){
			return next(err);
		}
		res.json(post);
	});
});


// ******** Things that require you to be logged on *************************

//Post Request
router.post('/', userValidation, function(req,res,next){
	var request = {
		name:req.body.name,
		discription:req.body.discription,
		tags:req.body.tags,
		budget:req.body.price,
		user_who_posted:req.decoded._doc._id
	}
	
	
	
	Request.create(request,function(err,post){
		if(err){
			return next(err);
		}
		res.json(post);
	});
});



// Update an Request
router.put('/:id', userValidation, function(req,res,next){
	Request.findById(req.params.id, function(err, post){
		
		query = { user_who_posted: req.decoded._doc._id };
		Request.update(query, req.body, function(err, post){
			if(err){
				return next(err);
			}

			res.json(post);	
		});

	}); 
});


// Delete an Request
router.delete('/:id', userValidation, function(req, res, next){
	Request.findById(req.params.id, function(err, post){
		
		query = { user_who_posted: req.decoded._doc._id };
		Request.remove(query, function(err, post){
			if(err){
				return next(err);
			}

			res.json(post);	
		});

	}); 

});

// **************** End things that require you to be logged on ****************


module.exports = router;






























