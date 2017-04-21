// Validation for JWT's
// Anything after this is imported will require validation, anything before will not
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');


var config = require('../config');



var tokenValidator = function(req, res, next){



    //decode the token
    if(token){

        //validates and decodes
        jwt.verify(token, app.get('tokenSecret'), function(err, decoded){
            if(err){
                // Didn't validate
                return res.json({ success: false , message: "Failed to Authenticate User."});
            }
            else{
                // Success
                req.decoded = decoded;

                next();
            }

        });

    }
    else{
        // This is if there is no token
        return res.status(403).send({
            success:"false",
            message:"No token provided"
        }); 
    }



};


module.exports = tokenValidator;


