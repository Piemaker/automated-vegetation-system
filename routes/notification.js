const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/notification.html')
});

module.exports = app