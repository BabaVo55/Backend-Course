import express from 'express';
import db from '../db.js';


const router = express.Router()
// Get all todos of user
router.get('/', (req, res) => {
    const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?');
    const todos = getTodos.all(req.userId)
    res.json(todos)
})
   
// Create new Todo
router.post('/', (req, res) => {

})

// Update a todo
router.put('/:id', (req, res) => {

})

router.delete('/:id', (req,res) => {
    
})
export default router;