var express = require('express');
var http = require('http')
var bodyParser = require('body-parser');
var env = process.env.NODE_ENV || "development";
var config = require('./config.json');
var cors = require('cors');

const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const teamRoutes = require('./api/routes/Team')
const reportRoutes = require('./api/routes/Report')
const matchRoutes = require('./api/routes/Match')
const judgeRoutes = require('./api/routes/Judge')

// MONGO
mongoose.connect(config.mongo.url, { useNewUrlParser: true })
// END MONGO

// EXPRESS USE
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.use(cors())
app.use(morgan('dev'));

var corsOptions = {
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept', 'token', 'content-type'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'PATCH'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (env === "production")
    app.use(app.static("build"));

// END OF EXPRESS USE

//ROUTES
app.use('/team', teamRoutes);
app.use('/report', reportRoutes);
app.use('/match', matchRoutes);
app.use('/judge', judgeRoutes);
app.delete('/db/dropall', (req, res) => {
    mongoose.createConnection(config.mongo.url).dropDatabase((err, results) => {
        if (err)
            return res.status(500).json({ error: { message: 'Could not clear database' } });
        return res.status(201).json({ success: { message: 'Cleared database' } });
    })
})
// END OF ROUTES

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);

});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


/* ACTUAL SERVER STUFFS */
http.createServer(app).listen(config.port, function () {
    console.log('Our project is running! ', (new Date()).toString());
    console.log('running on port is runing on port ', config.port);
}).on('error', function (err) {
    console.error(JSON.stringify(err));
});