// URL -> http://localhost:8003

const express = require('express');
const app = express();
const PORT = 8003

let data = {
    name: 'ethem'
}

//MIDDLEWARE

// HTTP routes / verbs (method - endpoint):
// The given verb indicates the nature of the request being made and the route is
//  the subdirectory / endpoint intended.
app.get('/', (req, res) => {
    console.log('Network-Side: Welcome to a very empty home page :D', req.method)   
    // Cannot have multiple sends
    // res.send('A very empty Homepage')
    res.sendStatus(201)
})

//TYPE 1:Website endpoints - These endpoints are for sending back HTML and they typically come when a user enters a url in the browser.

//Dashboard endpoint / route
app.get('/dashboard', (req, res) => {
    console.log('Dashboard page at your service')
    res.send('Hey there')
})

// HTML served up to client:
app.get('/home', (req, res) => {
    res.send(
        '<h1>Heres your new page cooking</h1><input placeholder=hello value=delete /><button id="button">Click me bruh</button> <script>const button = document.getElementById("button"); button.addEventListener("click", () => alert(`hey there you have pressed my button!!!!!!!!!!!!!!!`))</script>'
    )
}) 
//-----------------------------------------------------------------------


//TYPE 2:API endpoints (non Visual) - These are for when a user enters their username and password or something then you hit SUBMIT:

app.get('/api/data', (req, res) => {
    console.log('data api page');
    res.send(data.name)
})

//CRUD actions - Method
//  - Create (post) 
//  - Read (get)  
//  - Update (put)
//  - Delete (delete)

app.get('/html', (req, res) => {
    res.send(
        `
            <body 
                style="background-color:gray;
                    color:black"
            >
                <h1>Template literal test Via get request</h1>
                <p>The name in data is: ${data.name}</p>
            </body>
        `
    )
})

app.post('/html', (req, res) => {

    //Someone wants to create a user - e.g when you click sign up button.
    //After the user clicks the sign up button once they hav filled in their credentials, 
    //  their browser is wired up to send out a network request to the server to handle that action.
    const newData = req.body
    console.log(newData)
    res.sendStatus(201)
})

app.listen(PORT, () => console.log('wired in ;)' + `PORT: ${PORT}`))

