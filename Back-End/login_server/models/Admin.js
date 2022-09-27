const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    name: String,
    email: String,
    password: String,
    dateOfBirth: Date
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;