// URL -> http://localhost:8003

const express = require('express');
const app = express();
const PORT = 8003

let data = ['ethem']
let beta = ['hello']
//MIDDLEWARE
app.use(express.json())

// HTTP routes / verbs (method - endpoint):
// The given verb indicates the nature of the request being made and the route is
//  the subdirectory / endpoint intended.
app.get('/', (req, res) => {
    console.log('Network-Side: Welcome to a very empty home page :D', req.method)   
    // Cannot have multiple sends
    // res.send('A very empty Homepage')
    console.log('This is the Back end')
    res.send(
        `
            <h1>Home PAge</h1>
            <a href="/html">Click here for login Page</a>
            <script>console.log('front end?')</script>
        `
    )
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
                    color:black; display:flex; flex-direction: column; align-items:center;  height:full; flex-wrap:wrap"
            >
                <h1>Template literal test Via get request</h1>
                <input style="position:relative; border-radius:20px; padding:2px; border:none; text-indent:10px" id=input value=hello placeholder=try />
                <button style="position:relative; border-radius: 10px; margin:5px; border:none; font-size:12px" id=button>Press Me</button>
                <p style="color:lightgray; font-size: .6rem">The name in data is: ${JSON.stringify(data)}</p>
                <p style="color:darkgray; border:none; position:relative; left:10px">The name in beta is: ${beta}</p>
                <br />
                <br />
                <br />
                <a href="/">Back to Home NIgggahhh</a>
            </body>
        `
    )
})






 







app.post('/html', (req, res) => {

    //Someone wants to create a user - e.g when you click sign up button.
    //After the user clicks the sign up button once they hav filled in their credentials, 
    //  their browser is wired up to send out a network request to the server to handle that action.
    const newData = req.body.name
    const betaData = req.body.greet
    data.push(newData)
    beta.push(betaData)
    console.log(data)
    console.log(beta)
    res.sendStatus(201)
})

app.delete('/html', (req, res) => {
    let len = data.length;
    data.pop();
    beta.pop();
    console.log('Send a few times and you may be left with nothing')
    /* !data.length === len - 1 && res.send('nothing was delete'); */
    res.sendStatus(203)
})

app.put('/html', (req, res) => {
    let target = document.getElementById('button')
    target.innerHTML = req.body.new
    res.send(200)
    console.log('i think it worked')
})

app.listen(PORT, () => console.log('wired in ;)' + `PORT: ${PORT}`))