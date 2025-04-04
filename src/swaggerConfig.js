const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')

const options = {
    definition: {
        openapi: '3.0.0',
        info:{
            title: 'Api alunos',
            version: '1.0.0',
            description: "Api CRUD de alunos"
        }
    },
    apis : ["./src/routes/*.js"]
}

const spacs = swaggerJsdoc(options)

module.exports = {
    spacs,
    swaggerUi
}