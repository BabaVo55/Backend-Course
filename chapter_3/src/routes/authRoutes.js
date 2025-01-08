import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';


const router = express.Router();

// router.post('/register',(req, res) => {
//     const {username, password} = req.body;
//     console.log(username, password)
//     res.status(202)
//     res.send(`
//         <h1>${username}</h1>
//         <p>${password}</p>
//         `)
// })


router.post('/register',(req, res) => {
    const {username, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8)

    // Save new user and hashed password to the db
    try{
        const insertUser = db.prepare(`INSERT INTO users (username, password)
            VALUES (?, ?)`)
        const result = insertUser.run(username, hashedPassword)

        // now that we have a user, I want to add their first todo for them
        const defaultTodo = `Hello :) add your first TODO!`;
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task)
            VALUES (?, ?)`)
        let token = jwt.sign({id: result.lastInsertRowid}, 
            process.env.JWT_SECRET, {expiresIn: '24h'})
            
        insertTodo.run(result.lastInsertRowid, defaultTodo)
        res.json({token})

        // create a TOKEN

    }catch (err){
        console.log(err.message)
        res.sendStatus(503)
    }

})

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    
    try{
        
    }catch(err){
        console.log(err.message);
        res.sendStatus(503);
    }

})

export default router;