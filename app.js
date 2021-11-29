const express = require("express");
const session = require('express-session');
const app = express();

app.use(session({
    resave: true, 
    saveUninitialized: true, 
    secret: 'somesecret', 
    cookie: { maxAge: 60000 }}));

var bodyParser = require('body-parser');
// parsing application/json
app.use(bodyParser.json()); 
//  parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 

// //set session
// app.get('/set_session', (req, res) => {
//     //set a object to session
//     req.session.User = {
//         website: 'anonystick.com',
//         type: 'blog javascript',
//         like: '4550'
//     }

//     return res.status(200).json({status: 'success'})
// })

// //set session
// app.get('/get_session', (req, res) => {
//     //check session
//     if(req.session.User){
//         return res.status(200).json({status: 'success', session: req.session.User})
//     }
//     return res.status(200).json({status: 'error', session: 'No session'})
// })

// //destroy session
// app.get('/destroy_session', (req, res) => {
//     //destroy session
//     req.session.destroy(function(err) {
//         return res.status(200).json({status: 'success', session: 'cannot access session here'})
//     })
// })


var loginController = require("./controllers/loginController");
var userController = require('./controllers/userController');
var supplierController = require("./controllers/supplierController");
var employeeController = require("./controllers/employeeController");
var adminController = require("./controllers/adminController");

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

app.use("/login", loginController);
app.use("/", userController);
app.use("/supplier", supplierController);
app.use("/employee", employeeController);
app.use("/admin", adminController);


app.listen(5000, function() {
    console.log("Server is listening on port 5000!");
})