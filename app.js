require('dotenv').config()
const express=require('express')
const app=express()
const http = require('http').Server(app)
const bodyParser = require('body-parser')
const sequelize = require('./db')

const User = sequelize.import('./models/user')

// User.sync() 
// User.sync({force:true})
sequelize.sync()

app.use(bodyParser.json()) 
// this needs to be in front of other app.use. it must jsonify 
//so that other functions can use json objects.
//the other files that use req.body.... use json objects. 
app.use(require('./middleware/headers'))
app.use(require('./middleware/validate-session'))


app.use('/api/user', require('./routes/user'))
app.use('/api/login', require('./routes/session'))
app.use('/api/log', require('./routes/log'))
app.use('/api/definition', require('./routes/definition'))

// app.listen(3000, function() {
// 	console.log("app is open on 3000!")
// })

http.listen(process.env.PORT || 3000, function() {
	console.log('app is listening on port 3000')
})


//this file pulls in express and the headers.js file. it also gives response to the api/test url.
//when server open it shows app open



