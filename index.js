const connectToMongo = require('./db.js');
const URLofImages = require("./Schemas/urlshemas.js")
connectToMongo();
const express = require('express');
const port =  3000;
const app = express();
app.use(express.json());
app.listen(port,()=>{
    console.log("Running on port",port);
})
app.get('/',(req,res)=>{
    res.json(("Hello Vikram"));
})
app.get('/location',async(req,res)=>{
    const location = req.headers.location;
    const steps = await URLofImages.findOne({location});
    return res.json(steps);
    console.log(steps);

})

app.post('/location',async(req,res)=>{
    const getlocation  = req.body.location;
    const stepsArray = req.body.steps;

    const newLocation = new URLofImages({
        location: getlocation,
        steps: stepsArray
    })
    newLocation.save().then(()=>{
        return res.json("locations saved successfully")
    }).catch( ()=> res.json("something happened"))
    

})

module.exports =app;