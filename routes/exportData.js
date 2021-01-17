const express = require('express')
const app = express()
//import models 
const {Temperature} = require('../models/Base')
const {PH} = require('../models/Base')
const {ElectricConductivity} = require('../models/Base')

//get all selected model data from db
app.get('/', (req, res) => {
let model;
const {action , minDate, maxDate} = req.body;
//check which model is needed for query
// if(modelName == "Temperature"){
//   model = Temperature;
// }
// else if (modelName == "PH"){
//   model = PH;
// }
// else if (modelName == "ElectricConductivity"){
//   model = ElectricConductivity;
// }
//query model 
Temperature.find({})
.select("-_id value date")
.sort({"date":-1})
.limit(100)
.then(data => {
  res.json(data)
})
.catch(err=> res.send(err.message))
});

app.post('/',(req,res)=>{

  //res.header("Access-Control-Allow-Origin:*")
    const {action , modelName , minDate, maxDate} = req.body;
    let model;
    console.log(req.body)
    if(modelName == "Temperature"){
  model = Temperature;
}
else if (modelName == "PH"){
  model = PH;
}
else if (modelName == "ElectricConductivity"){
  model = ElectricConductivity;
}
//check action type
if(action == "previous")
{
model.find({date: { $lt: new Date(minDate) }})
.select("-_id value date")
.sort({"date":-1})
.limit(100)
.then(data => {
  res.json(data)
})
}
else if (action == "next"){
  model.find({date: { $gt: new Date(maxDate) }})
.select("-_id value date")
.sort({"date":1})
.limit(100)
.then(data => {
  res.json(data)
})
}
else if (action == "last"){
   model.find({})
.select("-_id value date")
.sort({"date":1})
.limit(100)
.then(data => {
  res.json(data)
})
} 
else if (action == "first"){
   model.find({})
.select("-_id value date")
.sort({"date":-1})
.limit(100)
.then(data => {
  res.json(data)
})
}
else if (action == "radio"){
  model.find({})
.select("-_id value date")
.sort({"date":-1})
.limit(100)
.then(data => {
  res.json(data)
})

} 
})

module.exports = app