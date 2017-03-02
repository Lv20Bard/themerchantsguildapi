var express = require('express');
var router = express.Router();

var moongoose = require('mongoose');
var Request = require('../models/request.js');



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
	Request.find( { tags: { $in: [req.body.tags] } } , function(err, post){

		if(err){
			return err;
		}
		res.json(post);
	});

});


router.get('/exactsearch', function(req, res){
	Request.find( { tags: { $all: [req.body.tags] } } , function(err, post){

		if(err){
			return err;
		}
		res.json(post);
	});

});





//Post Request
router.post('/', function(req,res,next){
	Request.create(req.body,function(err,post){
		if(err){
			return next(err);
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

// Update an Request
router.put('/:id', function(req,res,next){
	Request.findByIdAndUpdate(req.params.id, req.body, function(err, post){
		if(err){
			return next(err);
		}
		res.json(post);
	});
});


// Delete an Request
router.delete('/id',function(){
	Request.findByIdAndRemove(req.params.id, req.body, function(err,post){
		if(err){
			return next(err);
		}
		res.json(post);
	});

});



module.exports = router;






























