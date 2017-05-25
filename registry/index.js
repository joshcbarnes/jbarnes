var express = require("express");
var expressValidator = require("express-validator");
var bluebird = require("bluebird");
var bodyParser = require("body-parser");
var redis = require("redis");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

var app = express();
var redisClient = redis.createClient("6379", "redis");

app.use(bodyParser.json());
app.use(expressValidator());

app.get("/services", function(req, res, next) {
    redisClient.hgetallAsync("services").then(function(services) {
        res.json(Object.keys(services).map(service => {
            return JSON.parse(services[service]);
        }));
    });

    // res.json([
    //     {
    //         name: "About Me",
    //         icon: "fa-user"
    //     },
    //     {
    //         name: "This Site",
    //         icon: "fa-code"
    //     },
    //     {
    //         name: "Resources",
    //         icon: "fa-file-text"
    //     }
    // ]);
});

app.post("/services", function(req, res, next) {
    req.checkBody("postparam", "Invalid postparam").notEmpty().isJSON();
    req.getValidationResult()
        .then(function() {
            return redisClient.hsetAsync("services", req.body.name, JSON.stringify(req.body));
        })
        .then(function() {
            res.status(204).send({});
        });
});

app.listen(8081, function() {
    console.log("Started registry server");
});