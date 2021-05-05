const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.render("statistics",{title:"Statistics Page"})
});

module.exports = app