var Sequelize = require('sequelize')
var sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:*Crumismyfuture17@localhost:5432/workoutlog2.0', {
	dialect: 'postgres'
})

sequelize.authenticate().then(
	function() {
		console.log('connected to workoutlog2.0 postgres db')
	},
	function(err){
		console.log(err)
	}
)

var User = sequelize.import('./models/user')

module.exports = sequelize
