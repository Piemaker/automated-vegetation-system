const faker = require('faker')
//generate dummy data for DB
const generateDummyData = (min, max)=>{
var dummyData = [];
for(let i = 0; i < 50; i++){
dummyData.push(
  {value : faker.random.number({
    'min': min,
    'max': max
}),
  date : faker.date.between('2021-1-15','2021-3-15')
})
}
return dummyData;
}

//generate dummy with constant time steps
let dummyDateAndValue = (baseDate,deltaDate,minValue,maxValue,size)=>{
let newDate =  baseDate;
let dummyData = [];
while(size > 0){

dummyData.push({value :( Math.floor(Math.random() * (maxValue - minValue) + minValue)),date : new Date(newDate.getTime() + deltaDate*60000) })
newDate = new Date(newDate.getTime() + deltaDate*60000)
size--;

}
return dummyData;
}


//save dummy data in db collection
const insertDummy = (dummyData,modelName)=>{
modelName.insertMany(dummyData, function (err, res) {
  if (err) {
    console.log(err);
  };
  console.log(res);
});
}

//delete all documents from a model
const purgeModel = (modelName)=>{
modelName.deleteMany({}, function(err) {
            if (err) {
                console.err(err)
            } else {
                console.log('success');
            }
        }
    )}


    //export function to be available to entire project
    exports.generateDummyData = generateDummyData;
    exports.dummyDateAndValue = dummyDateAndValue;
    exports.insertDummy = insertDummy;
    exports.purgeModel = purgeModel;