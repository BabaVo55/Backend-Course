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
    // JSON.stringify(username)
    // JSON.stringify(password)

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
        console.log(username)
        console.log(password)
        // create a TOKEN

    }catch (err){
        console.log(err.message)
        res.sendStatus(503)
    }

})


// router.post('/login', (req, res) => {
//     const {username, password} = req.body;

//     if (!username || !password) {
//         return res.status(400).send({ message: "Username and password are required" });
//     }
        
    
//     try{

//     // const getUser = db.prepare('SELECT * FROM users WHERE username = ?')
//     const getUser = db.prepare('SELECT * FROM users WHERE username = ?');
//     const user = getUser.get(username);
//     if (!user) {
//         return res.status(404).send({ message: "User not found" });
//     }

//     const passwordIsValid = bcrypt.compareSync(user.password, password)
//     if(!passwordIsValid){
//         return res.status(401).send({message: "Password incorrect"});
//     }

//     console.log(user) 
//     const token = jet.sign({id: user.id}, process.env.JWT_SECRET, {
//        expiresIn: '24h' })
//     res.json({ token   })

        

//     }catch(err){
//         console.log(err.message);
//         res.sendStatus(503);
//     }

// })

router.post('/login', (req, res) => {
    // req.body = JSON.stringify(req.body)
    const {username, password} = req.body;
    // console.log(req.body)
    // if (!username || !password) {
    //     return res.status(400).send({ message: "Username and password are required" });
    // }

    try {

        const getUser = db.prepare('SELECT * FROM users WHERE username = ?');
        const user = getUser.get(req.body.username);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Correctly compare the provided password with the stored hashed password
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({ message: "Password incorrect" });
        }

        res.status(200).send({ message: 'Welcome back' });

    } catch (err) {
        console.log(err.message);
        res.sendStatus(503);
    }
});

export default router;
