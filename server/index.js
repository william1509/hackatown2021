const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const pg = require('pg');


const app = express();
const port = 3000;

// Connect to the bank database.

var config = {
    user: 'philippe',
    host: 'free-tier.gcp-us-central1.cockroachlabs.cloud',
    database: 'vague-moose-525.defaultdb',
    port: 26257,
    password: 'iOiuS5KB0xzossvb',
    ssl: {
        ca: fs.readFileSync('certs/ca.crt')
            .toString(),
        key: fs.readFileSync('certs/client.admin.key')
            .toString(),
        cert: fs.readFileSync('certs/client.admin.crt')
            .toString()
    }
};

// Create a pool.
var pool = new pg.Pool(config);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// enable all resources (cors)
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/fountains", function (req, res) {
    pool.connect(function (err, client, done) {
        if (err) {
            console.error('could not connect to cockroachdb', err);
            done();
        }
        client.query('SELECT * FROM fountains;')
            .then(result => {
                res.send(result.rows);
                done();
            })
            .catch(error => {
                res.sendStatus(500).json({message: error.message});
                done();
            });
    }); 
});

app.listen(process.env.PORT || port, () => {
    console.log(`Listening`);
});
