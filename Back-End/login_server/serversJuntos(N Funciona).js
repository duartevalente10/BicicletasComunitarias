// mongodb
require('./config/db');

const express = require("express");
const app = express();
app.use(express.static("public")); //Procedure to set public folder contain process files (css,image,.js,..)
app.set('view engine', 'ejs'); // Use ejs instead of html
app.set("views","./views"); // view folder contain .ejs files
const port = process.env.PORT || 5000;

// cors access to enable application on different hosts to send request
const cors = require("cors");
app.use(cors());

const UserRouter = require('./api/User');

const AdminRouter = require('./api/Admin');

// For accepting post form data
const bodyParser = require('express').json;
app.use(bodyParser());

// Parse URL-encoded bodies (as sent by HTML forms)
const bodyParser2 = require('body-parser')
app.use(bodyParser2.urlencoded({extended: true}))

app.use('/user', UserRouter);

app.use('/admin', AdminRouter);

//nodemailer config
const nodemailer = require('nodemailer');

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Create server
var server = require("http").Server(app); 
var io = require("socket.io")(server); 
server.listen(process.env.PORT || 3000, () => { 
   console.log('listening on *:3000');
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
var globalMQTT = 0;

// SOCKET
io.on("connection", function(socket)
{
  console.log("Client connected: " + socket.id);

  socket.on("disconnect", function() {
    console.log(socket.id + " disconnected");
  });

  socket.on("REQUEST_GET_DATA", function() {
    socket.emit("SEND_DATA",globalMQTT);
  });

  function intervalFunc() {
    socket.emit("SEND_DATA", globalMQTT);
  }
  setInterval(intervalFunc, 2000);
});


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
  console.log("Data from TTN: ", getDataFromTTN.uplink_message.decoded_payload.payload);
  //console.log("Data from TTN: ", getDataFromTTN.uplink_message.frm_payload);
  var getFrmPayload = getDataFromTTN.uplink_message.frm_payload;
  globalMQTT = Buffer.from(getFrmPayload, 'base64').toString();
});


// Setup load ejs file to display on Browsers
app.get('/lora',function(req,res){
 res.render("dashboard");
});