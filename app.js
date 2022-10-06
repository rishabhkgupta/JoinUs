var express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));



var connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: 'root',
    database: 'join_us'
});

app.get("/", function(req, res){
    var q = 'SELECT COUNT(*) as count from users';
    connection.query(q, function(err, results){
        if (err) throw err;
        var count = results[0].count;
        res.render("home", {count: count});
    });
});

app.post("/register", function(req, res){
    var person = {
        email: req.body.email
    };
    connection.query('INSERT INTO users SET ?', person, function(err, results){
        if(err) throw err;
        res.redirect("/");
    });
});

app.get("/joke", function(req, res){
    var joke = "just a joke.";
    res.send("<strong>joke of the</strong> <em>year</em>");
});

app.get("/randome_number", function(req, res){
    var num = Math.floor((Math.random() * 10) +1);
    res.send("your number is " + num)
});

app.listen(3000, function(){
    console.log("server running on 3000!");
});
