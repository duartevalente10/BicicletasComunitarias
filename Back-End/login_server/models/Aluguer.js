const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AluguerSchema = new Schema({
    name: String,
    bike: String,
    user: String,
    price: Number,
    startHour: Date,
    endHour: Date,
    hoursUsed: Number,
    available: Boolean
});

const Aluguer = mongoose.model('Aluguer', AluguerSchema);

module.exports = Aluguer;