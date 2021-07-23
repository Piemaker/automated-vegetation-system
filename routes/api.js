const express = require('express')
const app = express()
const helpers = require('../bin/helpers')
const {
    Temperature
} = require('../models/Base')
const {
    PH
} = require('../models/Base')
const {
    ElectricConductivity
} = require(('../models/Base'))
const Notification = require(('../models/Notification'))


// PH.deleteOne({ value: 50 }, function (err) {
//   if(err) console.log(err);
//   console.log("Successful deletion");
// });
//const dummyData = helpers.generateDummyData(0,100)
//console.table(dummyData)
//helpers.purgeModel(PH)
// helpers.purgeModel(ElectricConductivity)
// helpers.purgeModel(Temperature)
// helpers.purgeModel(Notification)


//  const dummyData1 = helpers.dummyDateAndValue(new Date(2021,5,15),30,1,14,250)
// const dummyData2 = helpers.dummyDateAndValue(new Date(2021,5,15),30,0,100,250)
// const dummyData3 = helpers.dummyDateAndValue(new Date(2021,5,15),30,1,80,250)

//  helpers.insertDummy(dummyData1,PH)
// helpers.insertDummy(dummyData2,Temperature)
// helpers.insertDummy(dummyData3,ElectricConductivity)

app.post("/",(req,res)=>{
    //et buff = new Buffer(req.body.image.data);
    //let base64data = buff.toString('base64');
    //console.log(base64data)
    console.log(req.body)
})
app.get("/imagefile/:image",(req,res)=>{
    // var data = getIcon(req.params.image);
    // var img = Buffer.from(data, 'base64');
    // console.log("in api handler ",req.params)
//    res.writeHead(200, {
//      'Content-Type': 'image/png',
//      'Content-Length': img.length
//    });
//    res.status(200).sendFile(img); 
res.json(res.params.imagefile)

})

const https = require('https');

const postData = JSON.stringify({
    text: "test"

});

const options = {
    hostname: 'yousseffekry.pythonanywhere.com',
    path: '/external',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

// const requset = https.request(options, (res) => {
//     //console.log(`STATUS: ${res.statusCode}`);
//     //console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//     res.setEncoding('utf8');
//     res.on('data', (chunk) => {
//         console.log(`BODY: ${chunk}`);
//     });
//     res.on('end', () => {
//         console.log('No more data in response.');
//     });
// });

// requset.on('error', (e) => {
//     console.error(`problem with request: ${e.message}`);
// });

// // Write data to request body
// requset.write(postData);
// requset.end();





module.exports = app