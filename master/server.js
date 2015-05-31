var http = require('http');
var url = require('url');
var exec = require('child_process').exec;
var express = require('express');
var bodyParser = require('body-parser');

var arduino = require('./arduino.js');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('.'));

app.post('/pi-command', function(request, response) {
    var command = request.body["command"];
    console.log('executing command on pi: ' + command);

    exec(command, function(error, stdout, stderr) {
        response.setHeader('Content-Type', 'text/plain');
        response.send(error ? stderr : stdout);
    });
});

app.post('/arduino-command', function(request, response) {
    var command = request.body["command"];
    console.log('sending command to arduino: ' + command);
    arduino.sendCommand(command, process.argv[3]);
    response.send();
});

var server = app.listen(process.argv[2]);
