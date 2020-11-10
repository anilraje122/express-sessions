var express = require('express');
var router = express.Router();
const Todo = require("../models/Todo");
/* 
Todo List APIs
*/
//Fetch all the todos from the DB
router.get('/todo', async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.send({ todos });
  } catch (err) {
    res.send(err);
  }
});
//Create a New toDO API
router.post("/todo/add", async (req, res) => {
  try {
    console.log(req.body);
    const todo = new Todo(req.body);
    await todo.save();
    res.send("Task Added");
  } catch (err) {
    res.send(err);
  }
})
module.exports = router;
