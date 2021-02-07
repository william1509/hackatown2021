const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const pg = require('pg');
const async = require('async');


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

app.get('/db', function (req, res) {
    pool.connect(function (err, client, done) {

        // Close communication with the database and exit.
    
        if (err) {
            console.error('could not connect to cockroachdb', err);
            done();
        }
        async.waterfall([
                function (next) {
                    // Create the 'accounts' table.
                    client.query('CREATE TABLE IF NOT EXISTS accounts (id INT PRIMARY KEY, balance INT);', next);
                },
                /*function (results, next) {
                    // Insert two rows into the 'accounts' table.
                    client.query('INSERT INTO accounts (id, balance) VALUES (1, 1000), (2, 250);', next);
                },
                function (results, next) {
                    // Print out account balances.
                    client.query('SELECT id, balance FROM accounts;', next);
                },*/
            ],
            function (err, results) {
                if (err) {
                    console.error('Error inserting into and selecting from accounts: ', err);
                    done();
                }
    
                console.log('Initial balances:');
                results.rows.forEach(function (row) {
                    console.log(row);
                });
    
                done();
            }
        );
    }); 
});

app.listen(process.env.PORT || port, () => {
    console.log(`Listening`);
});
