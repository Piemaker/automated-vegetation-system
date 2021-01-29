const express = require('express')
const app = express()
const helpers =  require('../bin/helpers')
const {Temperature} = require('../models/Base')
const {PH} = require('../models/Base')
const {ElectricConductivity} = require(('../models/Base'))
const Notification = require(('../models/Notification'))

//const dummyData = helpers.generateDummyData(0,100)
//console.table(dummyData)
//helpers.purgeModel(Notification)
//const dummyData = helpers.dummyDateAndValue(new Date(2020,1,15),30,1,14,250)
//helpers.insertDummy(dummyData,PH)













module.exports = app