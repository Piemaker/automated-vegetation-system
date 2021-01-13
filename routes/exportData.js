const express = require('express')
const app = express()
const Temperature = require('../models/temperature')//import model 

//get all temperature data from db
app.get('/temperature', (req, res) => {
//query model
Temperature.find({},(err,data)=>{
  if(err){
    res.send(err.message)
  }
  else{
  res.send(data)

  }
})
});

module.exports = app