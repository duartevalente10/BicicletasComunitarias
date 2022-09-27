#include <MKRWAN.h>
#include <TinyGPSPlus.h>
#include <SPI.h>
#include <Wire.h>

static const int RXPin = 4, TXPin = 3;
static const uint32_t SerialBaud = 9600;
static const uint32_t GPSBaud = 9600;
// AppEui
static String appEui = "1111111111111111";
// AppKey
static String appKey = "B0138E001853A6820F1F87C5FA61D05F";

//modulo gps
TinyGPSPlus gps;
//modulo Lora
LoRaModem modem;
//vars para a connecao e loop
int lifetime = 0;
int connected = 0;
int lastcon = 0;
//vars da ultima possicao
double last_lat = 0;
double last_lng = 0;
//var da distancia entre possicoes
unsigned long distanceToLast;

int LED = 7;
boolean ledValue = "HIGH";

//connecao com a ttn
void connectr() {
  //mensagem de connecao
  Serial.println("conn: connecting...");
  connected = 0;
  //porocura a connecao com a TTN
  if (!modem.begin(EU868)) {
    while (1) {}
  };
  //assim que encontra a connecao faz login com as respetivas cardenciais
  connected = modem.joinOTAA(appEui, appKey);
  //se nao forem validas
  if (!connected) {
    //mensagem de erro
    Serial.println("conn: FAIL");
    //se nao
  } else
  {
    //mensagem de licacao estabelecida
    Serial.println("conn: OK");
  }
}

//enviar mensagem para a TTN
void sendPayload(String msg) {
  //var para confirmar a comunicacao
  int err;
  //se a connecao nao existir
  if (!connected) {
    //volta a tentar connectar
    connectr();
  }
  //criar o pacote de envio
  modem.beginPacket();
  //enviar o que esta na var msg
  modem.print(msg);
  //guardar em err a resposta da TTN
  err = modem.endPacket();
  // se a ttn responder
  if (err) {
    Serial.println("data: OK");
    //atualizar o valor das coorndenadas gps
    lastcon = gps.time.value();
  } else {
    //mensagem de erro
    Serial.println("data: ERROR");
  }
}

void setup()
{
  pinMode(LED, OUTPUT);
  //delay de 1 sec
  delay(1000);
  //Ligacoes das portas
  Serial.begin(SerialBaud);
  Serial1.begin(GPSBaud);
  //delay de 1 sec
  delay(1000);
}

//delay para verificar coneccao com o GPS
static void smartDelay(unsigned long ms)
{
  unsigned long start = millis();
  do
  {
    while (Serial1.available())
      gps.encode(Serial1.read());
  } while (millis() - start < ms);
}

//loop
void loop()
{
  //se a localizacao do gps for valida e a qualidade for boa
  if (gps.location.isValid() == 1 && gps.hdop.hdop() < 10)
  {
    //var de latitude
    double cur_lat = gps.location.lat();
    //var de longitude
    double cur_lng = gps.location.lng();
    //formatacao das variaveis
    String vlat = String(cur_lat, 6);
    String vlng = String(cur_lng, 6);
    //formacao da msg que se vai enviar para a ttn
    String msg = vlat + "," + vlng ;

    // verificar se ouve alteracoes de posicao
    distanceToLast = (unsigned long)TinyGPSPlus::distanceBetween(cur_lat, cur_lng, last_lat, last_lng);
    Serial.println("loc: " + msg + " dist:" + String(distanceToLast) + " hdop:" + String(gps.hdop.hdop()));

    //se a possicao mudou
    delay(10000);
      //envia uma nova mensagem a TTN
      sendPayload(msg);
      delay(1000);
      if (!modem.available()) {
        Serial.println("No downlink message received at this time.");
        digitalWrite(LED, LOW);    
        last_lat = cur_lat;
        last_lng = cur_lng;
        return;
      }
      char rcv[64];
      int i = 0;
      while (modem.available()) {
        rcv[i++] = (char)modem.read();
      }
      digitalWrite(LED, HIGH);
      last_lat = cur_lat;
       last_lng = cur_lng;
    

    //substitui as vars da ultima possicao pelas novas


    //delay para verificar que exite connecao com o gps
    smartDelay(10 * 1000);

  } else {
    //mensagem se nao existir cooredenadas validas
    Serial.print(F("No GPS data!"));
    Serial.println("Sats: " + String(gps.satellites.value())  + " hdop:" + String(gps.hdop.hdop()));
    smartDelay(1000);
  }
}
