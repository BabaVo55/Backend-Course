// URL -> http://localhost:8003

const express = require('express');
const app = express();
const PORT = 8003

// HTTP routes / verbs:
// The given verb indicates the nature of the request being made and the route is
//  the subdirectory / endpoint intended.
app.get('/', (req, res) => {
    console.log('welcome to a very empty home page :D', req.method)
    res.send('A very empty Homepage')
    res.sendStatus(201)
})


app.listen(PORT, () => console.log('wired in ;)' + `PORT: ${PORT}`))

