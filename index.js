var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
const e = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
var session;

const oneDay = 10;//1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

app.get('/',(req,res) => {
    session=req.session;
    if(session.userid){
        res.send('Welcome'+userid);
    }else
    res.sendFile('Succesfully Logged Out');
});

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
    console.log(req.session)
    session.userid='';
    return session.userid;
});

// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {

    // check if account exists
    dal.find(req.params.email).
        then((users) => {

            // if user exists, return error message
            if(users.length > 0){
                console.log('User already in exists');
                res.send('User already in exists');    
            }
            else{
                // else create user
                dal.create(req.params.name,req.params.email,req.params.password).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }

        });
});


// login user 
app.get('/account/login/:email/:password', function (req, res) {
    
    dal.find(req.params.email).
        then((user) => {

            // if user exists, check password
            if(user.length > 0){
                if (user[0].password === req.params.password){
                    session=req.session;
                    session.userid=req.params.email;
                    console.log(req.session)
                    res.send(user[0]);
                    return session.userid;
                }
                else{
                    res.send('Login failed: wrong password');
                }
            }
            else{
                res.send('Login failed: user not found');
            }
    });
    
});


app.get('/logout',function (req,res){
    
    req.session.destroy();
    res.redirect('/');
});

// find user account
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one user by email - alternative to find
app.get('/account/findOne', function (req, res) {

    dal.findOne(session.userid).
        then((user) => {
       
            console.log(user);
            res.send(user);
    });
});


// update - deposit/withdraw amount
app.get('/account/update/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    dal.update(session.userid, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});
// update - transfer amount
app.get('/account/update/:email/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    dal.update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

// all accounts
app.get('/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

var port = 3001;
app.listen(port);
console.log('Running on port: ' + port);