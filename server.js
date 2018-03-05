var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');


var config = {
    user: 'badshahmoulik',
    host: 'db.imad.hasura-app.io',
    database: 'badshahmoulik',
    password: process.env.DB_PASSWORD,
    port: 5432,
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret : 'I am Moulik',
    cookie : { maxAge : 1000*60*60}
}));

function createTemplate(data){
    var title = data.title;
    var heading = data.heading;
    var content = data.content;
    var date = data.date;
    
    var htmlTemplate =
    `<html>
        <head>
            <title>${title}</title>
            <meta name="viewport" content = "width = device-width" initial scale = 0 />
            <link href="/ui/style.css" rel="stylesheet"/>
        </head>
        <body>
            <div class="container">
                <div>
                    <a href="/">Home</a>
                </div>
                <hr/>
            
                <h3>
                    ${heading}
                </h3>
                
                <div>
                    ${date.toDateString()}
                </div>
                
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>`;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
    //How do we create a hash
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ['pbkdf2','10000',salt,hashed.toString('hex')].join('$');
}

app.get('/hash/:input',function(req,res){
    var hashString = hash(req.params.input,'Hello I am Moulik');
    res.send(hashString);
});

app.post('/register',function(req,res){
    //Take the username and password
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbpass = hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbpass],function(err,result){
        if (err){
            res.status(500).send(err.toString());
        }
        else
        {
            res.send('User successfully created ' + username);
        }
    });
});

app.post('/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    pool.query('SELECT * FROM "user" WHERE username = $1',[username],function(err,result){
        if (err){
            res.status(500).send(err.toString());
        }
        else
        {
            if(result.rows.length === 0)
            {
                res.status(403).send('username/password is invalid');
            }
            else 
            {
                //Match The password
                var dbString = result.rows[0].password;
                var salt = dbString.split('$')[2];
                var hashPass = hash(password,salt);
                if(hashPass === dbString){
                    //Set Session Id
                    req.session.auth = {userid : result.rows[0].id};
                    res.send('Successfully Logged In');
                }
                else {
                    res.status(403).send('username/password is invalid');
                }
            }
        }
    });
});



var pool = new Pool(config);
app.get('/test-db',function(req,res){
    //make a select request
    pool.query('SELECT * FROM test',function(err,result){
        if (err){
            res.status(500).send(err.toString());
        }
        else
        {
            res.send(JSON.stringify(result));
        }
    });
    //get results
});

var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
  res.send(counter.toString());
});

var namelist = [];
app.get('/submit',function (req,res){
    //Get The name from request query params
    var name = req.query.name;
    namelist.push(name);
    //JSON to send response
    res.send(JSON.stringify(namelist));
});

app.get('/article/:articleName', function (req, res) {
    //var articleName = req.params.articleName;
    
    pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else
        {
            if(result.rows.length === 0){
                res.status(404).send('Article Not Found');
            } else {
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
