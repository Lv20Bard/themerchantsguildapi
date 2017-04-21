var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');

var User = require('../models/user.js');

var config = require('../config');

var userValidation = require('../middleware/userValidation.js');



/* GET users listing. */
router.post('/', function(req, res) {
 
	var newUser = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});


	newUser.save(function(err){
		if(err){
			throw err;
		}


		var token = jwt.sign(newUser, config.secret,{
			expiresIn: "1d"
		});

		res.json({
			success:true,
			token:token
		});

	});

});

router.post('/login',function(req,res){
	User.findOne({
		email: req.body.email
	},
	function(err,user){
		if(err){
			throw err;
		}

		//No User
		if(!user){
			res.json({success: false, message:'User Not Found!'})
		}

		//User
		else if(user){
			// User but wrong password
			if(user.password != req.body.password){
				res.json({success: false, message:"Wrong Password"})
			}
			// User and correct password
			else{
				var token = jwt.sign(user, config.secret, {
					expiresIn:"1d"
				});


				res.json({
					success:true,
					message:"Login Successful",
					token:token
				});
			}	
		}

	}

	);
});





// Get all users
router.get('/', userValidation, function(req,res){
	User.find({}, function(err, users){
		if(err)return err;
		res.json(users);
	});
});	



module.exports = router;
