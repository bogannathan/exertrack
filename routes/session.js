let router = require('express').Router()
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
let sequelize = require('../db')
let User = sequelize.import('../models/user')

router.post('/', function(req, res) {
		//1)First we need a function that searches for a particular user that matches the incoming request.		
		//2)If the request is successful and the username matches, we need to do some stuff.
				//Compare the password
					//if the password matches, show success and give the user a token.
					//if the password doesn't match, show the failure to authenticate
			//If the request is not successful and there is not a user that matches that request,
			//throw an error.
			//2)If the request was not successful and that user does not exist, throw an error.
	User.findOne( { where: { username: req.body.user.username } } ).then( //find a user that matches username to req.body.user.username
			//findOne is a sequelize method
		function(user) { //for .then, the first argument is success, second is failure
			if (user) { //user is the server response
				bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches){
					if (matches) {
					   let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*20});
						res.json({
							user: user,
							message: "successfully authenticated",
							sessionToken: token
						});
					}else {
					res.status(500).send({ error: "failed to authenticate" });
					}
				});
			} else {
				res.status(500).send({ error: "failed to authenticate" });
			}
		},
		function(err) {
			res.json(err);
		}
	);
});

module.exports = router