const { DataTypes } = require('sequelize') 
const sequelize = require('../database')

const Aluno = sequelize.define('Aluno', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
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

module.exports = Aluno