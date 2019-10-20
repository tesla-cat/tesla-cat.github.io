#include "SimpleESP32servers.h"
#include "SimpleESP32MIDI.h"

SimpleESP32servers simpleESP32servers;
SimpleESP32MIDI simpleESP32MIDI(0, 14, 2);

void customHandleWebSocketsText(uint8_t *payload) {
    String message = String( (char *)payload );
    Serial.println("handleWebSocketsText: "+message);

    StaticJsonDocument<200> doc;
    deserializeJson(doc, payload);
    
    // BytesToFPGA
    if(doc["BytesToFPGA"] != "null"){
      for(int i=0; i< sizeof(doc["BytesToFPGA"]);i++){
        byte myByte=doc["BytesToFPGA"][i];
        Serial.print("BytesToFPGA."); Serial.println(i); Serial.println(myByte);
      }
    }

    // noteSend
    if(doc["noteSend"] != "null"){
      for(int i=0; i< sizeof(doc["noteSend"]);i++){
        int frequency=doc["noteSend"][i]["frequency"];
        Serial.print("frequency:"); Serial.println(frequency);
      }
    }    

}

void setup(){
    simpleESP32servers.startWiFiAndServers(
            "ESP32 Access Point",
            "bomb4065"
    );
}

void loop(){
    simpleESP32servers.runRoutine();
    if(simpleESP32MIDI.lastNoteIsFinished){
      simpleESP32MIDI.playNoteBegin(2000, pow(2,14)-2, 100, 200);
    }
    if(!simpleESP32MIDI.lastNoteIsFinished){
      simpleESP32MIDI.playNoteContinue();
    }
}
