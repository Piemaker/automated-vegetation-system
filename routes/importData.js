//This route is for importing data from the MC and saving it in its corresponding model as well as checking if the imported values are in acceptable range, otherwise, that value will be saved in the notificaiton model aswell to be displayed for the user
const express = require('express')
const app = express()
//import models 
const { Temperature } = require('../models/Base')
const { PH } = require('../models/Base')
const { ElectricConductivity } = require('../models/Base')
const Notification = require('../models/Notification')
//import helper functions
const helpers =  require('../bin/helpers')
//graph values
const TemperatureThreshold = { min: 20, max: 50 }
const PHThreshold = { min: 6, max: 8 }
const ElectricThreshold = { min: 10, max: 30 }
//thresholds are used to evaluate the data value to see if it should be saved as a notificaiton

app.post('/',(req,res)=>{

  const { modelName, value , date } = req.body;
  let model;
  console.log(req.body)
  //check model type 
  if (modelName == "Temperature") {
    model = Temperature;
    //check value if it should be saved as a notificaiton
    let notificaitonObj = helpers.constructNotificaitonObject(value, TemperatureThreshold, modelName, date)
    //constructNotificaitonObject() returns null if the value is within acceptable thresholds
    if(notificaitonObj != null){
    helpers.insertOne(Notification, notificaitonObj)}
  }
  else if (modelName == "PH") {
    model = PH;
    let notificaitonObj = helpers.constructNotificaitonObject(value, PHThreshold, modelName, date)
    if(notificaitonObj != null){
    helpers.insertOne(Notification, notificaitonObj)}
   
  }
  else if (modelName == "ElectricConductivity") {
    model = ElectricConductivity;
    let notificaitonObj = helpers.constructNotificaitonObject(value, ElectricThreshold, modelName, date)
    if(notificaitonObj != null){
    helpers.insertOne(Notification, notificaitonObj)}
   
  }
  //insert imported data from MC in to corresponding model
  let dataObj = {value : value , date : new Date (date)}
  helpers.insertOne(modelName,dataObj)

})



module.exports = app