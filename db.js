const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://vikramBaby:Iamstrong8621@cluster-vikram.lqeaxt0.mongodb.net/vikram"

async function connectToMongo(){
    await mongoose.connect(mongoURI).then(()=>console.log("Connected to mongo")).catch((err)=>console.log("Error occured",err));
}

module.exports = connectToMongo;