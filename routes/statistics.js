const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/statistics.html')
});

module.exports = app