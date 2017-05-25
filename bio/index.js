var express = require("express");
var http = require("request-promise-json");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var server = app.listen(8082, register);

var registrationInterval = 1000;
function register() {
    http.post("http://registry:8081/services", {
            name: "About Me",
            icon: "fa-user"
        }).then(function() {
            console.log("Registered bio server");
        }).catch(function(error) {
            console.log("Error registering bio service: " + error);
            console.log("retrying in " + (registrationInterval / 1000) + "s");

            setTimeout(register, registrationInterval);
            registrationInterval *= 2;
        });
}
