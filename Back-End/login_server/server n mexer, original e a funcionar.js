// mongodb
require('./config/db');

const app = require('express')();
const port = process.env.PORT || 5000;

// cors access to enable application on different hosts to send request
const cors = require("cors");
app.use(cors());

const UserRouter = require('./api/User');

const AdminRouter = require('./api/Admin');

// For accepting post form data
const bodyParser = require('express').json;
app.use(bodyParser());

app.use('/user', UserRouter);

app.use('/admin', AdminRouter);

//nodemailer config
const nodemailer = require('nodemailer');

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

