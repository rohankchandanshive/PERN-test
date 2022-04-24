const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors())
app.use(express.json())

//Route
app.post('/addTodos', async (req,res) => {
    try{
       const {description} = req.body;
       const newTodo = await pool.query(' INSERT into todo (description) VALUES($1) RETURNING *',[description]);
       res.json(newTodo.rows);
    } catch(err) {
        console.log(err.message);
    }
})

app.get('/todos',async (req,res) => {
    try{
        const allTodos = await pool.query(' SELECT * FROM todo');
        res.json(allTodos.rows);
    } catch(err) {
        console.log(err.message);
    }
})

app.get('/todo/:id',async (req,res) => {
    try{
        const {id} = req.params;
        const todo = await pool.query(' SELECT * FROM todo WHERE todo_id = $1',[id]);
        res.json(todo.rows);
    } catch(err) {
        console.log(err.message);
    }
})

app.put('/updateTodo/:id',async (req,res) => {
    try{
        const {id} = req.params;
        const {description} = req.body;
        const allTodos = await pool.query(' UPDATE todo SET description=$1 WHERE  todo_id=$2',[description,id]);
        res.json('Todo updated Successfully !');
    } catch(err) {
        console.log(err.message);
    }
})

app.delete('/deleteTodo/:id',async (req,res) => {
    try{
        const {id} = req.params;
        const delTodo = await pool.query(' delete FROM todo WHERE todo_id=$1',[id]);
        res.json('Todo is deleted!');
    } catch(err) {
        console.log(err.message);
    }
})

app.listen(5000,()=>{
console.log('application running at port 5000');
})