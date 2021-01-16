// server.js
// where your node app starts

// init project
const express = require('express');//for backend api development
const app = express();
const path = require('path');//used to concate directories
const faker = require('faker');//for dummy generation
const bodyParser = require("body-parser")//used to parse form responses
const mongoose = require("mongoose")//for database schema building
//to allow external sites to get json data
const cors = require('cors');
//mount body parser
app.use(bodyParser.urlencoded({extended: false})) // for form request to work
app.use(bodyParser.json()); // for fetch request to work

//save DB URL
process.env.MONGO_URL="mongodb+srv://OSM:databasepassword@cluster0.pk6bc.mongodb.net/<dbname>?retryWrites=true&w=majority" 
//connect to database
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("Connected to DB")
});


// http://expressjs.com/en/starter/static-files.html
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bin')));
app.use(cors());


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


//import routes
const index = require('./routes/index')
const api = require('./routes/api')
const exportData = require('./routes/exportData')
const statistics = require('./routes/statistics')
//set routes
app.use('/',index)
app.use('/statistics',statistics)
app.use('/api',api)
app.use('/api/exportData',exportData)


// listen for requests 
var listener = app.listen(process.env.PORT||3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
