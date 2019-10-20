/*
  SimpleESP32MIDI.cpp
  - Use ESP32 to play MIDI notes.
  Created by Tesla Cat (Ding Ruiqi), Sept 12, 2019.
  This code is private and commercial use is not allowed.
*/

#include "SimpleESP32MIDI.h"

//////////////////// Begin Methods Definition //////////////

SimpleESP32MIDI::SimpleESP32MIDI(
        int channel,
        int resolution,
        int pin) {
    ledChannel = channel;
    ledResolution = resolution;
    ledPin = pin;
    Serial2.begin(115200,SERIAL_8N2); delay(10);
    ledcSetup(ledChannel, 500, ledResolution);
    ledcAttachPin(ledPin,  ledChannel);
}

void SimpleESP32MIDI::playNoteBegin(
        int frequency, int dutyCycle,
        int duration, int totalTime) {
    startTime = millis();
    this->duration = duration;
    this->totalTime = totalTime;
    //   ------------------___________
    //   |<-- duration -->|
    //   |<------- totalTime ------->|
    //   |<-- startTime
    ledcSetup(ledChannel, frequency, ledResolution);
    ledcAttachPin(ledPin,  ledChannel);
    ledcWrite(ledChannel, dutyCycle );
    lastNoteIsFinished = false;
}

void SimpleESP32MIDI::playNoteContinue() {
    unsigned long currentTime=millis();
    if(currentTime < startTime + duration){
        // do nothing
        // lastNoteIsFinished = false;
    }
    else if(currentTime < startTime + totalTime){
        ledcWrite(ledChannel, 0);
    }
    else{
        lastNoteIsFinished = true;
    }
}

//////////////////// End Methods Definition //////////////
