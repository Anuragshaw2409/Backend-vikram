const connectToMongo = require('./db.js');
const URLofImages = require("./Schemas/urlshemas.js");
const fetch = require('node-fetch');
connectToMongo();
const express = require('express');
const cors = require('cors');
const port = 3000;
const app = express();
app.listen(port, () => {
    console.log("Running on port", port);
})
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json(("Hello Vikram"));
})
app.get('/location', async (req, res) => {
    const location = String(req.headers.location);
    const currentStep = req.headers.step
    const steps = await URLofImages.findOne({ location });
    const urlarray = steps.steps;
    // Recieved all the urls just need to manipulate the url by adding ../uc?id=.... and remove /view till end
    const cleanedUrls = urlarray.map((step) => {
        const url = step;
        const id = url.substring(url.search('d/') + 2, url.lastIndexOf('/'));
        const finalUrl = "https://drive.google.com/" + "uc?id=" + id;
        return finalUrl;

    });
    // do a node-fetch for each url
    const response = await fetch(cleanedUrls[currentStep]);
    if (!response.ok) {
        res.send("Not fetched");

    }
    res.set("Content-Type", "image/jpeg");


    response.body.pipe(res);
    



})

app.post('/location', async (req, res) => {
    const getlocation = req.body.location;
    const stepsArray = req.body.url;

    const newLocation = new URLofImages({
        location: getlocation,
        steps: stepsArray
    })
    newLocation.save().then(() => {
        return res.json("locations saved successfully")
    })
        .catch((err) => res.json(err.message))


});

// app.get('/image', async (req, res) => {
//     const response = await fetch('https://drive.google.com/uc?id=1YPKzVwdaBJ4aACyi9ZyE60L14hCPeyGR')
//     if (!response.ok) {
//         res.send("Not fetched");

//     }
//     res.set("Content-Type", "image/jpeg");


//     response.body.pipe(res);
// })

app.get('/totalsteps',async(req,res)=>{
    
    const location = String(req.headers.location);
    console.log(location);
    const steps = await URLofImages.findOne({ location });
    res.json(steps.steps.length);

});


module.exports = app;