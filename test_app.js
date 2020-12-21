var mysql = require('mysql');
var express = require ('express');
var app = express();

var connection = mysql.createConnection({                   //connection node.js and mysql
  host     : 'localhost',   //localhost
  user     : 'root',        //some username
  database : 'join_us',     //some_database
  password  : 'harimaupagi2305',
  port      : 3306          //sport number
});

app.get("/",function(req,res){
    res.send("Hello from our web app");
    console.log('Someone requested us!');
});

app.get("/joke",function(req,res){
    var joke = "no joke lol";
    res.send(joke);
    console.log('Someone requested joke route!');
});

app.get("/random_num",function(req,res){
    var num = Math.floor(Math.random() * 10) + 1;
    res.send('your lucky number is ' + num);
    console.log('Someone requested num route!');
});

app.listen(8080,function(){
    console.log('App listening on port 8080');
});