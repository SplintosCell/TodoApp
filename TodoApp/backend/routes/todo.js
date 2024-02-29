const express = require('express')
const Todo = require('../models/todo');

const router = express.Router();

// get all todo

router.get("/todo", (req, res) => {
   Todo.find().then(todos => {
    res.json(todos);
   }).catch(e => {
    console.error(e)
   })
})
// post new todo
router.post("/todo", (req, res) => {
    const newTodo = new Todo({item: req.body.item, done: req.body.done});
    newTodo.save().then((r) => {
        res.json(r)
    }).catch((e) => console.error(e))
})

// patch when you want to update single to little elements by id :D

router.patch("/todo/:id", (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, {item: req.body.item, done: req.body.done}).then(r => {
        console.log(r)
        res.json(r)
    }).catch((e) => console.error(e))
})

// delete 
router.delete("/todo/:id", (req, res) => {
    Todo.findByIdAndDelete(req.params.id).then(() => {
        res.send("deleted successfully")
    });
})

// update

router.put("/todo/:id", (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, {item: req.body.item, done: req.body.done}).then(r => {
        res.json(r)
    }).catch((e) => console.error(e))
})

module.exports = router;