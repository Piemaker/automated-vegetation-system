const express = require('express')
const app = express()
const helpers =  require('../bin/helpers')
const {Temperature} = require('../models/Base')
const {PH} = require('../models/Base')
const {ElectricConductivity} = require(('../models/Base'))
//const dummyData = helpers.generateDummyData(0,100)
//console.table(dummyData)
//helpers.purgeModel(Temperature)
//const dummyData = helpers.dummyDateAndValue(new Date(2020,1,15),30,-25,60,250)
//helpers.insertDummy(dummyData,ElectricConductivity)













module.exports = app