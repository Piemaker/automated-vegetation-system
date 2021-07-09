const express = require('express')
const app = express()
//import models 
const { Temperature } = require('../models/Base')
//return page and set title & minimum date of the form to the oldest record in the database and the maximum date to the current date
app.get('/', (req, res) => {
  Temperature.find({})
   .sort({ "date": +1 })
    .select("date -_id")
    .limit(1)
    .then(data => {
      const currentDate = new Date();
      res.render("statistics",{title:"Statistics Page", minDate : `${data[0].date.toISOString().split('T')[0]}`, maxDate : currentDate.toISOString().split('T')[0] })
    })
    .catch(err => res.send(err.message))
  
});

module.exports = app

// db.collection.find().sort({age:-1}).limit(1) // for MAX
// db.collection.find().sort({age:+1}).limit(1) // for MIN