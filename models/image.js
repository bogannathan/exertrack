module.exports = function(sequelize, DataTypes){
	return sequelize.define('image', {
        imagelink: DataTypes.STRING,
        owner: DataTypes.INTEGER
	})
}