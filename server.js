// URL -> http://localhost:8003

const express = require('express');
const app = express();
const PORT = 8003

// HTTP routes / verbs (method - endpoint):
// The given verb indicates the nature of the request being made and the route is
//  the subdirectory / endpoint intended.
app.get('/', (req, res) => {
    console.log('Network-Side: Welcome to a very empty home page :D', req.method)   
    // Cannot have multiple sends
    // res.send('A very empty Homepage')
    res.sendStatus(201)
})
//Dashboard endpoint / route
app.get('/dashboard', (req, res) => {
    console.log('Dashboard page at your service')
    res.send('Hey there')
})

app.get('/home', (req, res) => {
    res.send(
        '<h1>Heres your new page cooking</h1><input placeholder=hello value=delete /><button id="button">Click me bruh</button> <script>const button = document.getElementById("button"); button.addEventListener("click", () => alert(`hey there you have pressed my button!!!!!!!!!!!!!!!`))</script>'
    )
})


app.listen(PORT, () => console.log('wired in ;)' + `PORT: ${PORT}`))

