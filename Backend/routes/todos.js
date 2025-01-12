const express = require('express');
const Todo = require('../models/Todo'); 
const {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo,
} = require('../controller/todoController');

const router = express.Router();
router.get('/', getAllTodos); 
router.post('/', createTodo); 
router.put('/:id', updateTodo); 
router.delete('/:id', deleteTodo)
module.exports = router;
