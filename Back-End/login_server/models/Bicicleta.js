const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BicicletaSchema = new Schema({
    name: String,
    priceHour: Number,
    latitude: Number,
    longitude: Number,
    hoursUsed: Number,
    available: Boolean,
    imageUrl: String
});

const Bicicleta = mongoose.model('Bicicleta', BicicletaSchema);

module.exports = Bicicleta;