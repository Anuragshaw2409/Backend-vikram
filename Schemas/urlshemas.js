const mongoose = require('mongoose');
const {Schema} =mongoose;


const urlschema = new Schema({
location: {type:String,
required: true},
steps:[String]
});

module.exports = mongoose.model("urlschema",urlschema);
