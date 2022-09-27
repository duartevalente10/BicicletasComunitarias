// mongodb
require('./config/db');

const app = require('express')();
const port = process.env.PORT || 5000;

const Bicicleta = require('./models/Bicicleta');

// cors access to enable application on different hosts to send request
const cors = require("cors");
app.use(cors());

const UserRouter = require('./api/User');

const AdminRouter = require('./api/Admin');

const BicicletaRouter = require('./api/Bicicleta');

const AluguerRouter = require('./api/Aluguer');

// For accepting post form data
const bodyParser = require('express').json;
app.use(bodyParser());

app.use('/user', UserRouter);

app.use('/admin', AdminRouter);

app.use('/bicicleta',BicicletaRouter);

app.use('/aluguer',AluguerRouter);

//nodemailer config
const nodemailer = require('nodemailer');

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// MQTT setup
var mqtt = require('mqtt');
var options = {
    port: 1883,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'ard-lora-test-bici-ipt@ttn',
    password: 'NNSXS.DVMQMOVCYZA47LXTG27Z7TTQORGEL332DNNBOHA.TJJAB5J2W5KZMVDE32RQTBRR4CBXCSSKJFUR5MOTULQEWCQR3XMQ',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};
var client = mqtt.connect('http://eu1.cloud.thethings.network',options);

// Global variable to save data
var globalMQTT = 15111;

// MQTT setup
client.on('connect', function() {
    console.log('Client connected to TTN')
    client.subscribe('#')
});

client.on('error', function(err) {
    console.log(err);
});

client.on('message', function(topic, message) {
    var getDataFromTTN = JSON.parse(message);
    
    try{
        console.log("Data from TTN: ", getDataFromTTN.uplink_message.decoded_payload.payload);
        var getFrmPayload = getDataFromTTN.uplink_message.decoded_payload.payload;
        globalMQTT = Buffer.from(getFrmPayload);
        var myArray = getFrmPayload.split(",")
        var lat = myArray[0];
        var lng = myArray[1];

        Bicicleta.find({name: "Amarela"}).then( data => {
            if(data.length){
                Bicicleta.updateOne({ name: "Amarela" }, { latitude: lat, longitude: lng}).then()
                    .catch((error) => {
                        console.log(error);
                    });
                    if(!data[0].available){
                        client.publish("v3/ard-lora-test-bici-ipt@ttn/devices/eui-a8610a32373b5e02-bicicletes/down/push", '{"downlinks":[{"f_port": 2,"frm_payload": "AA==","priority": "NORMAL"}]}')
                        console.log("Downlink enviado");
                        
                    } 
                    console.log("Bicicleta atualizada"); 
                    console.log(data[0].available);
            }else{
                console.log("Bicicleta não encontrada");
            }
        })
    }catch{
        console.log("Not a payload from node");
    }
    
});

module.exports = globalMQTT;

