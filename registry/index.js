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
    res.json([
        {
            name: "About Me",
            icon: "fa-user"
        },
        {
            name: "This Site",
            icon: "fa-code"
        },
        {
            name: "Resources",
            icon: "fa-file-text"
        }
    ]);
    // redisClient.getAsync("services").then(function(services) {
    //     res.send(services);
    // });
});

// app.post("/services", function(req, res, next) {
//     req.checkBody("postparam", "Invalid postparam").notEmpty().isJSON();
//     req.getValidationResult().then(function() {
//         redisClient.rpush("services", );
//     });

    
//     lock.acquire("servicesUpdate", function() {
//         redisClient.getAsync("services").then(function(services) {
//             if (!services) {
//                 services = [];
//             }
//             services.push();
//             redisClient.set("services", );
//         });
//     });
// });

app.listen(8081, function() {
    console.log("Started registry server");
});