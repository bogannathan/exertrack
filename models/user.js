module.exports = function(sequelize, DataTypes){
	return sequelize.define('user', {
		username: DataTypes.STRING,
		passwordhash: DataTypes.STRING,
		fullname: DataTypes.STRING,
		summary: DataTypes.STRING,
		age: DataTypes.STRING,
		gender: DataTypes.STRING

	})
}