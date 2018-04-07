let router = require('express').Router()
let sequelize = require('../db')
let Log = sequelize.import('../models/log')
let User = sequelize.import('../models/user')
let Definition = sequelize.import('../models/definition')

router.post('/', function(req, res) {
	//REQ HAS SOME BODY PROPERTIES THAT HAVE A USERNAME AND PWD
	console.log('here is error')
	let description = req.body.log.desc
	let result = req.body.log.result
	let user = req.user
	let definition = req.body.log.def 
	let date = req.body.log.date || '2018/01/09'

	//use our sequelize model to create a log 
	Log
		.create({
			description: description,
			result: result,
			owner: user.id,
			def: definition,
			date: date 
		})
		.then(
			function createSuccess(log) {
				res.json(log)	
			},
			function createError(err) {
				// console.log('here is error')
					res.send(400, date)
			}
		)
})

router.get('/', function(req, res) {
	console.log('here')
	let userid = req.user.id
	Log
	.findAll({
		where: {owner: userid}
	})
	.then(
		function findAllSuccess(data) {
			console.log(data + " get log.js")
			res.json(data)
		},
		function findAllError(err) {
			// console.log('here is error')
			res.send(500, err.message)
		}
	)
})

router.get('/:id', function(req, res) {
	let data = req.params.id
	Log
		.findOne({
			where: {id: data}
		}).then(
			function getSuccess (updateData) {
				console.log(data + " update Data")
				res.json(updateData)
			},

			function getError(err) {
				res.send(500, err.message)
			}
		)
})

//This will return the data form the log that was updated
router.put('/', function(req, res) {
	let description = req.body.log.desc
	let result = req.body.log.result
	let data = req.body.log.id
	let definition = req.body.log.def
	let date = req.body.log.date
	console.log(req)
	Log
		.update(
		{
			description: description,
			result: result,
			def: definition,
			date: date
		},

		{where: {id: data}}
		).then(
		function updateSuccess(updatedLog) {
			res.json(updatedLog)
		},

		function updateError(err){
			res.send(500, err.message)
		}
	)
})

router.delete('/', function(req, res) {
	let data = req.body.log.id
	Log
		.destroy({
			where: {id: data}
		}).then(
			function deleteLogSuccess(data) {
				res.send("You removed a log")
			},
			function deleteLogError(err) {
				res.send(500, err.message)
			}
		)
})

module.exports = router