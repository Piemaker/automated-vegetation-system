const express = require('express')
const app = express()
//import model 
const Temperature = require('../models/temperature')
//get all temperature data from db
app.get('/temperature', (req, res) => {
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

app.post('/temperature',(req,res)=>{
  //res.header("Access-Control-Allow-Origin:*")
    const {action ,minDate, maxDate} = req.body;
    console.log(req.body)
//check action type
if(action == "previous")
{
Temperature.find({date: { $lt: new Date(minDate) }})
.select("-_id value date")
.sort({"date":-1})
.limit(100)
.then(data => {
  res.json(data)
})
}
else if (action == "next"){
  Temperature.find({date: { $gt: new Date(maxDate) }})
.select("-_id value date")
.sort({"date":1})
.limit(100)
.then(data => {
  res.json(data)
})
}
else if (action == "last"){
   Temperature.find({})
.select("-_id value date")
.sort({"date":1})
.limit(100)
.then(data => {
  res.json(data)
})
} 
else if (action == "first"){
   Temperature.find({})
.select("-_id value date")
.sort({"date":-1})
.limit(100)
.then(data => {
  res.json(data)
})
} 
})

module.exports = app