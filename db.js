const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const mongoURI = process.env.URI;

async function connectToMongo(){
    await mongoose.connect(mongoURI).then(()=>console.log("Connected to mongo")).catch((err)=>console.log("Error occured",err));
}

module.exports = connectToMongo;