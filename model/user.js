let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let UserSchema = Schema({
    id: Number,
    firstname: String,
    lastname: String,
    picture: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    role: String,
}, { collection: 'User' });

UserSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
// le nom de la collection (par défaut assignments) sera au pluriel, 
// soit assignments
// Si on met un nom "proche", Mongoose choisira la collection
// dont le nom est le plus proche
module.exports = mongoose.model('User', UserSchema);

