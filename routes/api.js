const express = require('express')
const app = express()
const helpers =  require('../bin/helpers')
const {Temperature} = require('../models/Base')
const {PH} = require('../models/Base')
const {ElectricConductivity} = require(('../models/Base'))
const Notification = require(('../models/Notification'))

//const dummyData = helpers.generateDummyData(0,100)
//console.table(dummyData)
//helpers.purgeModel(PH)


 //const dummyData1 = helpers.dummyDateAndValue(new Date(2020,1,15),30,1,14,250)
// const dummyData2 = helpers.dummyDateAndValue(new Date(2020,1,15),30,0,100,250)
//const dummyData3 = helpers.dummyDateAndValue(new Date(2020,1,15),30,1,80,250)

 //helpers.insertDummy(dummyData1,PH)
// helpers.insertDummy(dummyData2,Temperature)
//helpers.insertDummy(dummyData3,ElectricConductivity)














module.exports = app