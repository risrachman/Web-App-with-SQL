var mysql = require('mysql');
var express = require ('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');                              //configuring our engine, set with ejs
app.use(bodyParser.urlencoded({extended: true}));           //tell express that now using body parser
app.use(express.static(__dirname + '/public'));            //buat connect ke data css (styling gambar)

var connection = mysql.createConnection({                   //connection node.js and mysql
  host     : 'localhost',   //localhost
  user     : 'root',        //some username
  database : 'join_us',     //some_database
  password  : 'harimaupagi2305',
  port      : 3306          //sport number
});

app.get("/",function(req,res){
    var q = 'SELECT COUNT(*) AS count FROM users';
    connection.query(q, function(error, results){
        if (error) throw error;
        var count = results[0].count;
        console.log(q + ' as follows:');
        console.log(results);
        // res.send('Total number of users are ' + count);
        res.render('home',{data: count});                                 //look for 'views' directories:home.ejs (karena sudah di set diatas pake '.ejs')
        console.log('Someone requested total users route!');
    });
});

app.post('/register',function(req,res){                                             // A POST route, will triger when post to /register
    console.log(req.body);
    console.log('Post request sent to /register! email is = ' + req.body.email);    //post request ga bisa langsung nulis di laman, get request nanti kl nulis langsung, makanya post harus melalui form    
    var person = {email: req.body.email};                                           //extracting FORM data from request body
    connection.query('INSERT INTO users SET ?', person, function(error, result) {
        if (error) throw error;
        console.log('Insertion: Success!!, Result as follows:');
        console.log(result);
        // res.send('Thanks for joining our wait list!!');                          //ngasih plain text saja
        // res.render('thanks');                                                       //redierct ke html baru
        res.redirect('/');                                                          //redirect ke halaman awal cmn di update [TETAP]
    });
})

app.get("/joke",function(req,res){
    var joke = "<strong>no joke</strong> <em>lol</em> sorry mate!!";
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