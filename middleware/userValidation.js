var jwt    = require('jsonwebtoken');
var bodyParser = require('body-parser');

var config = require('../config');



var validateUser = function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];


    //grab the token
    console.log(req.body);
	// var token = req.body.token || req.require.token || req.header


    if(token){
        jwt.verify(token, config.secret, function(err, decoded){
            if(err){
                return res.json({ success:false, message:'Failed to authenticate token.'});
            }
            else{
                req.decoded = decoded;
                next();
            }
        });
    }
    else{
        return res.status(403).send({
            success:false,
            message:'No token provided'
        })
    }
};

module.exports = validateUser;