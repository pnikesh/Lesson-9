let mongoose = require('mongoose');

//create model class
let favouriteSchema = mongoose.Schema({
    name: String,
    desc: String,

},
{
    collection: "favorite_things"



});

module.exports = mongoose.model('nikesh_patel',favouriteSchema);