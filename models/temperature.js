const mongoose = require("mongoose")
const Schema = mongoose.Schema;


var TemperatureSchema = new Schema({
  value : {type :Number, required : true,trim: true,},
  date : {type : Date , required : true}
})
//create a user model
  module.exports = mongoose.model('Temperature',TemperatureSchema);