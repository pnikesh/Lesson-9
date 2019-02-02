let mongoose = require('mongoose');

//create model class
let contactSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    age: Number

},
{
    collection: "first"



});

module.exports = mongoose.model('demo_mongo',contactSchema);