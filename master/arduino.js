var readline = require('readline');
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

function inputLoop(callback) {
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("> ", function(input) {
        callback(input);
        inputLoop(callback);
    });

    rl.on('close', function() {
        console.log('bye!');
        rl.close();
        process.exit(0);
    });
}

function startShell(serialDevice) {
    var sp = new SerialPort(serialDevice, {
            baudrate: 9600,
            parser: serialport.parsers.readline("\n")
    });
    sp.on("open", function(error) {
        sp.on('data', function(data) {
            // console.log('data received: ' + data);
        });

        sp.on("close", function(error) {
            console.log("close");
        });

        setTimeout(function () {
            inputLoop(function(input) {
                sp.write(input, function(err, results) {
                    if (err) {
                        console.log('err ' + err);
                    }
                });
            });
        }, 3000); // wait for arduino serial to handle shit
    });
}

function sendCommand(command, serialDevice) {
    var sp = new SerialPort(serialDevice, {
            baudrate: 9600,
            parser: serialport.parsers.readline("\n")
    });
    sp.on("open", function(error) {
        sp.on("close", function(error) {
            console.log("close");
        });

        setTimeout(function() {
            sp.write(command, function(err, results) {
                if (err) {
                    console.log('err ' + err);
                }
            });
        }, 0);
    });
}

exports.sendCommand = sendCommand;
exports.startShell = startShell;
