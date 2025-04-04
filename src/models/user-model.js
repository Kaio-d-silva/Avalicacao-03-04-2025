const { DataTypes } = require('sequelize') 
const sequelize = require('../database')

const User = sequelize.define('User', {
    id:{
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    idade:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    turma:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = User