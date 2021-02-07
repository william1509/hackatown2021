const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const pg = require('pg');
const path = require('path');
const Busboy = require('busboy');


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
        client.query( 'SELECT f.id, f.arrondissement, f.parc, f.repere, f.longitude, f.latitude, AVG(Rating) as rating, COUNT(Rating) as ratingNumber ' + 
                      'FROM fountains as f LEFT JOIN reviews as r ON f.id = r.fountain ' + 
                      'GROUP BY f.id;')
            .then(result => {
                res.send(result.rows);
                done();
            })
            .catch(error => {
                console.log(error.message);
                //res.sendStatus(500).json({message: error.message});
                done();
            });
    }); 
});

app.post("/reviews", function (req, res) {
    pool.connect(function (err, client, done) {
        if (err) {
            console.error('could not connect to cockroachdb', err);
            done();
        }
        client.query('INSERT INTO reviews (fountain, rating) VALUES ($1, $2);',
            [req.body.fountain, req.body.rating])
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

app.get("/fountainPictures/*", function (req, res) {
    res.sendFile(__dirname + req.originalUrl);
});

app.post("/upload", function (req, res) {
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

      var saveTo = path.join(__dirname, "fountainPictures/" + filename);
      file.pipe(fs.createWriteStream(saveTo));
    });

    busboy.on('finish', function() {
      res.writeHead(200, { "Connection": "close" });
      res.end();
    });

    return req.pipe(busboy);   
});

app.post("reviews", function (req, res) {
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

      var saveTo = path.join(__dirname, "fountainPictures/" + filename);
      file.pipe(fs.createWriteStream(saveTo));
    });

    busboy.on('finish', function() {
      res.writeHead(200, { "Connection": "close" });
      res.end();
    });

    return req.pipe(busboy);   
});




app.listen(process.env.PORT || port, () => {
    console.log('Listening');
});
