var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


let articles = {
    'article-one' : {
        'title' : 'Moulik Aggarwal | Coding 101',
        'heading':'Article One',
        'content' : '<p> Moulik Aggarwals Content',
        'date' : 'Feb 13 2018'
    },
    'article-two' : {
        'title' : 'Moulik Aggarwal | Coding 102',
        'heading':'Article Two',
        'content' : '<p> Moulik Aggarwals Content',
        'date' : 'Feb 15 2018'
    },
    'article-three' : {
        'title' : 'Moulik Aggarwal | Coding 103',
        'heading':'Article Three',
        'content' : '<p> Moulik Aggarwals Content',
        'date' : 'Feb 17 2018'
    },
};

function createTemplate(data){
    let title = data.title;
    let heading = data.heading;
    let content = data.content;
    let date = data.date;
    
    let htmlTemplate =
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
                    ${date}
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

app.get('/:articleName', function (req, res) {
    let articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
