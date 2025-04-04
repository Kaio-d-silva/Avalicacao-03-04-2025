const express = require('express')
const router = express.Router()
const Aluno = require('../models/aluno-model')




/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT 
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Aluno:
 *       type: object
 *       required:
 *         - nome
 *         - idade
 *         - turma
 *       properties:
 *         nome:
 *           type: string
 *           description: O nome de aluno
 *         idade:
 *           type: integer
 *           description: A idade do aluno
 *         turma:
 *           type: string
 *           description: A Turma aluno
 *       example:
 *         nome: João da Silva
 *         idade: 20
 *         turma: Desenvolvimento de sistemas
 */

/**
 * @swagger
 * tags:
 *   name: Alunos
 *   description: Gerenciamento de Aluos API
 */
/**
 * @swagger
 * /api/alunos:
 *   post:
 *     summary: Cria um novo aluno
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     responses:
 *       201:
 *         description: O aluno foi criado com sucesso!
 *       500:
 *         description: Algum erro aconteceu
 */


router.post('/alunos', async (req, res) => {
    try {
        const aluno = await Aluno.create(req.body)
        res.status(201).json(aluno)            
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

/**
 * @swagger
 * /api/alunos:
 *   get:
 *     summary: Retorna a lista de usuários
 *     tags: [Alunos]
 *     responses:
 *       200:
 *         description: A lista de alunos foi retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aluno'
 */

router.get('/alunos', async (req, res) => {
    try {
        const alunos = await Aluno.findAll()
        res.json(alunos)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
   
})

/**
 * @swagger
 * /api/alunos/{id}:
 *   put:
 *     summary: Atualiza o usuário por id
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description:  O id do aluno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     responses:
 *       200:
 *         description: O aluno foi atualizado com sucesso
 *       404:
 *         description: O aluno não foi encontrado
 *       500:
 *         description: Algum erro aconteceu
 */

router.put('/alunos/:id', async (req, res) => {
    try {
        const aluno = await Aluno.findByPk(req.params.id)
        if (aluno){
            await aluno.update(req.body);
            res.json(aluno)
        }else{
            res.status(404).json({error: 'Aluno not found'})
        }  
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})


/**
 * @swagger
 * /api/alunos/{id}:
 *   delete:
 *     summary: Remove o usuário por id
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O id do usuário
 *     responses:
 *       200:
 *         description: O aluno foi removido com sucesso
 *       404:
 *         description: O aluno não foi encontrado
 *       500:
 *         description: Algum erro aconteceu
 */

router.delete('/alunos/:id', async (req, res) => {
    try {
        const aluno = await Aluno.findByPk(req.params.id)
        if (aluno){
            await aluno.destroy()
            res.json({message: 'Aluno deletado com sucesso'})
        }else{
            res.status(404).json({error: "Aluno not found"})
        }

    } catch (error) {
        res.status(500).json({error: error.message})
    }

})

module.exports = router