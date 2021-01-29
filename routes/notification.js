const express = require('express')
const app = express()
const Notification = require('../models/Notification')

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/notification.html')
});
//update the notification model when user reads it
app.patch('/',(req,res)=>{
  const {id , read} = req.body
  Notification.findByIdAndUpdate(id, {read: read})
  .then( data => res.json("Success in updating notificaiton"))
  .catch(err => res.json(err.message))
})

module.exports = app