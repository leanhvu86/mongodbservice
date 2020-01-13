const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('errorhandler');
require('./models/User');
require('./db/db');
require('./config/passport');
require('./models/Province');

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

//Initiate our app
const app = express();

//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
require('./routers/province.route')(app);
require('./routers/user.router')(app);
if (!isProduction) {
    app.use(errorHandler());
}

app.use(session({
    key: 'user',
    secret: 'somerandonstuffs',
    resave: false,
    cookie: {
        expires: 600000
    }
}));
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user) {
        res.redirect('/login');
    } else {
        next();
    }
};


app.listen(8000, () => console.log('Server running on http://localhost:8000/'));
