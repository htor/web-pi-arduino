var piForm = document.getElementById('pi-command-form');
var arduinoForm = document.getElementById('arduino-command-form');

piForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var command = piForm.elements["command-input"].value;
    runPiCommand(command);
});

arduinoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var command = arduinoForm.elements["command-input"].value;
    runArduinoCommand(command);
});

function runPiCommand(command) {
    var request = new XMLHttpRequest();
    request.open('POST', '/pi-command', true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = request.responseText;
            var code = document.getElementById('command-output');
            code.innerHTML = data;
        } else {
            console.log('oops! something horrible happened.');
        }
    };

    request.onerror = function() {
        console.log('connection error');
    };

    request.send("command=" + command);
}

function runArduinoCommand(command) {
    var request = new XMLHttpRequest();
    request.open('POST', '/arduino-command', true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
        } else {
            console.log('oops! something horrible happened.');
        }
    };

    request.onerror = function() {
        console.log('connection error');
    };

    request.send("command=" + command);
}
