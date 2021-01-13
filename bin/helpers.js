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
    exports.insertDummy = insertDummy;
    exports.purgeModel = purgeModel;