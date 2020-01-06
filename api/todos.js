const express = require('express')
const router = express.Router()

const TodoList = require('../models/TodoList')

router.get('/todos', (req, res) => {
    TodoList.query()
        .then(todos => {
            res.json(todos)
        })
})

router.get('/todos/:id', (req, res) => {
    let id = parseInt(req.params.id)
    TodoList.query()
        .where('id', id)
        .eager('todo_items')
        .then(todos => {
            res.json(todos)
        })
})

module.exports = {
    router: router
}
