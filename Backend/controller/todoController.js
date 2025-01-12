const Todo = require('../models/Todo'); 


const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createTodo = async (req, res) => {
    try {
        const todo = new Todo({
            title: req.body.title,
        });
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            { completed: req.body.completed },
            { new: true }
        );
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteTodo = async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo,
};
