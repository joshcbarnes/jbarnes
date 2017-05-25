var express = require("express");
var http = require("request-promise-json");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/rest/services", function(req, res, next) {
    http.get("http://registry:8081/services")
        .then(function(result) {
            res.json(result);
        });
});

app.listen(8080, function() {
    console.log("Started jbarnes server");
});