const path = require('path');
const express = require('express');
const session = require('express-session');
//const { response } = require('express');
const app = express();
const PORT = process.env.PORT || 5000

// set up sessions
app.use(session({
    secret: 'my-super-secret-secret!',
    resave: false,
    saveUninitialized: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')))

app.use(logRequest);

app.post('/login', handleLogin);
app.post('/logout', handleLogout);
app.get('/getServerTime', verifyLogin, getServerTime);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

function handleLogin(request, response) {
    let result = { success: false };
    //First get the username and password as post parameters (body of the request)
    let username = request.body.username;
    let password = request.body.password;

    // Check if username is "admin" and password is "password"
    if (username == "admin" && password == "password") {
        request.session.user = username; // Store username in the session
        result = { success: true }; // Return a JSON object with a success value set to true
    }
    response.json(result);
}

function handleLogout(request, response) {
    let result = { success: false };
    // Check if the username is on the session
    if (request.session.user) {
        request.session.destroy(); // Destroy the session
        result = { success: true }; // Return a JSON object with success set to true
    }
    response.json(result);
}

function getServerTime(request, response) {
    let time = new Date();
    let result = { success: true, time: time };

    response.json(result);
}

function verifyLogin(request, response, next) {
    // First check if the username is on the session
    if (request.session.user) {
        next();
    } else {
        // Send JSON error message and status code 401
        let result = { success: false, message: "Access Denied" };
        response.status(401).json(result);
    }
}

function logRequest(request, response, next) {
    console.log("Received a request for: " + request.url);
    next();
}