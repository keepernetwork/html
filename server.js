const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');



app.use(morgan('combined'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set path for static assets
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
    res.render('index');
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.render('error', { status: err.status, message: err.message });
});


app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;