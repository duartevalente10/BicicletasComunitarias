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

// For accepting post form data
const bodyParser = require('express').json;
app.use(bodyParser());

app.use('/user', UserRouter);

app.use('/admin', AdminRouter);

app.use('/bicicleta',BicicletaRouter);

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
    password: 'NNSXS.RO5WTKKPAJJ2KKUQO6KUDLMEYEC5U2ZWITZSG3I.MEHLDLTR3CRPL4PMOBQNMSUGRE5DUU33HJNHLKR3U4B2GJZRJSIQ',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};
var client = mqtt.connect('https://eu1.cloud.thethings.network',options);

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
    console.log("Data from TTN: ", getDataFromTTN.uplink_message.frm_payload);
    var getFrmPayload = getDataFromTTN.uplink_message.frm_payload;
    globalMQTT = Buffer.from(getFrmPayload, 'base64').toString();
    
});

module.exports = globalMQTT;