const mongoose = require('mongoose');
const {Schema} =mongoose;


const urlschema = new Schema({
location: String,
steps:[String]
});

module.exports = mongoose.model("urlschema",urlschema);
