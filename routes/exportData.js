const express = require('express')
const app = express()
const Temperature = require('../models/Temperature')//import model 


app.get('/temperature', (req, res) => {
  res.send("Hey hey hey!")
});

module.exports = app