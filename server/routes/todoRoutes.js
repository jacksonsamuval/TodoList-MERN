const express = require('express');
const { createTodo, getAllTodo, deleteTodo, updateTodo } = require('../controller/todoCtrl');

const todoRouter = express.Router();

todoRouter.post('/', createTodo)
todoRouter.get('/getAll', getAllTodo)
todoRouter.delete('/deleteToDo/:id', deleteTodo)
todoRouter.put('/updateToDo/:id', updateTodo)

module.exports = todoRouter;