const express = require('express')
const app = express()
const midlewares = require('./midlewares/index')
const prompt = require('prompt')
const fs = require('fs')
const path = require('path')
const { swaggerUi, spacs } = require('./swaggerConfig')
const sequelize = require('./database')

PORT = 3000

app.use('/api-docs', swaggerUi.serve , swaggerUi.setup(spacs))

app.use(midlewares.bodyParser)
app.use(midlewares.cors)
app.use(midlewares.contenType)


fs.readdirSync(path.join(__dirname, 'routes')).forEach(file => {
    const route = require(`./routes/${file}`)
    app.use('/api', route)
});

const startServer = (PORT) =>{
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`)
    }).on('error', (err) => {
        if(err.code === 'EADDRINUSE'){
            console.log(`A porta ${PORT} ja esta em uso`)
            const newPort = PORT + 1
            promptNewPort(newPort)
        }
    })
}

const promptNewPort = (newPort) => {
    prompt.start();
    const schema = {
        properties: {
            useNewPort: {
                description: `Porta ${newPort} está disponível. Deseja usar essa porta? (sim/não)`,
                pattern: /^(sim|não|s|n)$/i,
                message: 'Responda com "sim" ou "não"',
                required: true
            }
        }
    };

    prompt.get(schema, (err, result) => {
        if (result.useNewPort.toLowerCase() === 'sim' || result.useNewPort.toLowerCase() === 's') {
            startServer(newPort);
        } else {
            console.log('Servidor não iniciado.');
        }
    });
};



sequelize.sync().then(() => {
    console.log('Banco de dados conectado');
    startServer(PORT)
}).catch(err => {
    console.log('servidor não iniciado', err)
})