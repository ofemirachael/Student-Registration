const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const ejs = require('ejs');
const app = express();

const stud = require('./router/s.router');

mongoose.connect('127.0.0.1/school_register');

const port = process.env.PORT;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: 'i am a boy',
    saveUninitialized: true,
    resave:true
}));

app.use(express.static(__dirname + '/client/dist/'));
app.set('views', __dirname + '/client/dist/');
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');

app.use(cors({ origin: 'http://localhost:4200' }));

app.use('/api/', stud);

app.get('*', function (req, res) {
    res.render('index.html');
});

mongoose.connection.on('connected', function(){
    app.listen(port, function(){
        console.log('server running on port '+ port);
    });
})
    .on('err', function(err){
        console.log('database error' + err);
    });
