const connectToMongo = require('./db.js');
const URLofImages = require("./Schemas/urlshemas.js")
connectToMongo();
const express = require('express');
const cors = require('cors');
const port =  3000;
const app = express();
app.listen(port,()=>{
    console.log("Running on port",port);
})
app.use(cors());
app.use(express.json());

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
    const stepsArray = req.body.url;

    const newLocation = new URLofImages({
        location: getlocation,
        steps: stepsArray
    })
    newLocation.save().then(()=>{
        return res.json("locations saved successfully")
    })
    .catch( (err)=> res.json(err.message))
    

});

module.exports =app;