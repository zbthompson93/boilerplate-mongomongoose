require('dotenv').config();
//To-Do # 1: Install & Set up mongoose */
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

// Code was suggested below
//mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//To-Do # 2: Create a Model
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// Create a Person model base off the personSchema
const Person = mongoose.model('Person', personSchema);

// Creates a new person using the model. Must call the save fxn to create them with the callback error handling fxn
const createAndSavePerson = (done) => {
  let bennyHana = new Person({
    name: "Benny Hana",
    age: 42,
    favoriteFoods: ["chicken", "rice", "veggies"]
  });

  bennyHana.save(function(err, data){
    if(err) return console.error(err);
    done(null, data);
  })
};


// Create many different entries with Model.create(). Also has error handling
let arrayOfPeople = [
  {name: "Bobby Bobberson", age: 58, favoriteFoods: ["meat", "potatoes"]},
  {name: "Josaphina Marquez", age: 35, favoriteFoods: ["carneseca", "al pastor"]},
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data){
    if(err) return console.error(err);
    done(null, data);
  });
  done(null /*, data*/);
};


// Searching DB for persons by name. Model.find() returns array of values;
let personName = "Bobby Bobberson";

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data){
    if(err) return console.error(err);
    done(null, data);
  })
};

// Searching DB for persons by name. Model.findOne() returns on value;
let food = "al pastor";

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data){
    if(err) return console.error(err);
    done(null, data);
  })
};


// Search DB values by id
let personId = 1;

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data){
    if(err) return console.error(err);
    done(null, data);
  })
};

// Find a person to update
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // Find by id
  Person.findById(personId, function(err, person){
    if(err) return console.error(err);

    // Add hamburger to favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // Save update to person
    person.save(function(err, data){
      if(err) return console.error(err);
      done(null, data);
    })
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  // Find by first input, update with second input, set third input to {new: true} to return the updated object
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

// Find Person by id and delete them
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, data){
    if(err) return console.error(err);
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  /*
  // Long way
  // Find by food
  let query = Person.find({favoriteFoods: foodToSearch});
  // Sort name ascending (1)
  query.sort({name: 1});
  // Limit results to 2
  query.limit(2);
  // Hide age (0)
  query.select({age: 0});
  // Execute query
  query.exec(function(err, data){
    if(err) return console.error(err);
    done(null, data);
  })*/

  // Chain it together
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec(function(err, people) {
      if(err) return console.error(err);
      done(null, people);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
