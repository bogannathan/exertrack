let router = require('express').Router()
let sequelize = require('../db.js')
let User = sequelize.import('../models/user')
let Image = sequelize.import('../models/image')
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')

router.post('/', function(req, res) {
	// when we post to api user, it will want a user object in the body
	let username = req.body.user.username
	let pass = req.body.user.password 
	let fullname = req.body.user.fullname
	let summary = req.body.user.summary
	let age = req.body.user.age
	let gender = req.body.user.gender
	
	console.log("user")
	//need to create a user object and use sequelize to put that user into our database
	//needs to match the model above (the username password)
	User.create({
		username: username,
		passwordhash: bcrypt.hashSync(pass, 10),
		fullname: fullname,
		summary: summary,
		age: age,
		gender: gender
	}).then(
			//sequelize is going to return the object it created from db
		function createSuccess(user){
			let token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: 60*20})
			res.json({
				user: user,
				message: 'create',
				sessionToken: token
			})	
			console.log('create success')	
		},
		function createError(err){
			res.send(500, err.message)
		}
	)
})

router.post('/upload-image', function(req, res) {
	
	console.log('test')
	console.log(req.user)
	console.log(req.body.imagelink)
	console.log(req)
	let user = req.user
	let imagelink = req.body.imagelink
	// res.json(req)
	
	Image
		.create({
			imagelink: imagelink,
			owner: user.id
		})
		.then(
			function createSuccess(log) {
				res.json(log)	
			},
			function createError(err) {
				console.log('here is error for image', err)
					res.send(400, err)
			}
		)
})

router.get('/image', function(req, res) {
	let userid = req.user.id
	console.log(req)
	Image
		.findAll({
			where: {owner: userid}
		})
		.then(
			function findAllSuccess(link) {
				res.json(link)	
			},
			function createError(err) {
				// console.log('here is error')
					res.send(400, err.message)
			}
		)
})

router.get('/', function(req, res) {
	//user variable
	let userid = req.user.id
	User
		.findAll({
			where: {owner: userid}
		})
		.then(
			//success
			function findAllSuccess(data) {
				//console.log(data)
				res.json(data)
			},
			//failure
			function findAllError(err) {
				res.send(500, err.message)
			}
		)
})

router.put('/', function(req, res) {
	let username = req.body.user.username
	let pass = req.body.user.password 
	let fullname = req.body.user.fullname
	let data = req.body.user.id
	let summary = req.body.user.summary
	let age = req.body.user.age
	let gender = req.body.user.gender

	console.log("user test")
	User
		.update(
		{
			username: username,
			passwordhash: bcrypt.hashSync(pass, 10),
			fullname: fullname,
			summary: summary,
			age: age,
			gender: gender	
		},
		{where: {id: data}}
		).then(
		function updateSuccess(updatedPassword) {
			res.json(updatedPassword)
		},

		function updateError(err) {
			res.send(400, err.message)
		}
	)
})

module.exports = router;

