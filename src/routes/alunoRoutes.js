const express = require('express')
const router = express.Router()
const User = require('../models/user-model')


let alunos = []

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
    const aluno = req.body
    console.log(aluno)
    aluno = await User.create(aluno)
    res.status(201).json(aluno).send("Aluno criado com sucesso")
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
    const alunosBanco = await User.findAll()
    res.json(alunosBanco)
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

router.put('/alunos/:id', (req, res) => {
    const alunoId = req.params.id
    const updateAluno = req.body
    alunos = alunos.map(aluno => aluno.id === alunoId ? updateAluno : aluno )
    res.status(200).json(updateAluno).send("aluno atualizado com sucesso")
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

router.delete('/alunos/:id', (req, res) => {
    const alunoId = req.params.id
    alunos = alunos.filter(aluno => aluno.id !== alunoId )
    res.send('Aluno deletado com sucesso')
})

module.exports = router