/*
  SimpleESP32MIDI.h
  - Use ESP32 to play MIDI notes.
  Created by Tesla Cat (Ding Ruiqi), Sept 12, 2019.
  This code is private and commercial use is not allowed.
*/
#ifndef SimpleESP32MIDI_h
#define SimpleESP32MIDI_h

//////////////////// Begin Class Definition //////////////
#include <Arduino.h>

class SimpleESP32MIDI{
private:
    int ledChannel, ledResolution, ledPin;
    unsigned long startTime;
    int duration, totalTime;

public:
    bool lastNoteIsFinished = true;

    SimpleESP32MIDI(int channel, int resolution, int pin);
    void playNoteBegin(
            int frequency, int dutyCycle,
            int duration, int totalTime);
    void playNoteContinue();
};

//////////////////// End Class Definition //////////////

#endif
