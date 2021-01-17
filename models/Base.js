const mongoose = require("mongoose")
const Schema = mongoose.Schema;


var BaseSchema = new Schema({
  value : {type :Number, required : true,trim: true,},
  date : {type : Date , required : true}
})
//create a user model
  
 
module.exports = {
  Temperature: mongoose.model('Temperature',BaseSchema),
  PH: mongoose.model('PH',BaseSchema),
  ElectricConductivity : mongoose.model('ElectricConductivity',BaseSchema),
}