const int ledPin = 13;
const int buzzPin = 9;
char character;
String message = "";

int duration = 100;
int frequency = 440;

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buzzPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {

  while (Serial.available()) {
    character = Serial.read();
    message.concat(character);
    light(1);
  }

  if (message.length() > 0) {
    dispatch(message);
    message = "";
  }

  delay(500);
}

void dispatch(String message) {
  if (message.startsWith("beep")) {
    duration = message.substring(4).toInt();
    Serial.println(duration);
    if (duation.length() > 0) {
        beep(duration);
    }
    message = "";
  } else if (message.startsWith("freq")) {
    frequency = message.substring(4).toInt();
  }
}

void beep(int milliseconds) {
  tone(buzzPin, frequency, milliseconds);
}

void light(int n) {
  for (int i = 0; i < n; i++) {
    digitalWrite(ledPin, HIGH);
    delay(20);
    digitalWrite(ledPin, LOW);
    delay(20);
  }
}
