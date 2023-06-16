let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let Prof = require('../model/prof');
let Eleve = require('../model/eleve');
let Matiere = require('../model/matiere');


// let AssignmentSchema = Schema({
//     id: Number,
//     dateDeRendu: Date,
//     nom: String,
//     rendu: Boolean,
//     imageEleve:String,
//     auteur:String,
//     matiere:String,
//     note:Number,
//     remarque:String
// });
// let AssignmentSchema = Schema({
//     id: Number,
//     nom: String,
//     profid: String,
//     eleveid: String,
//     dateDeRendu: Date,
//     rendu: Boolean,
//     matiereid: String,
//     note: Number,
//     remarque: String,
// });

let AssignmentSchema = Schema({
    id: Number,
    title: String,
    description: String,
    PJ: String,
    idSubject: Number,
    idAuthor: Number,
    note: Number,
    remark: String,
    isRender: String,
    limitDate: Date,
    createdAt: Date,
    renderedAt: Date
});

AssignmentSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
// le nom de la collection (par défaut assignments) sera au pluriel, 
// soit assignments
// Si on met un nom "proche", Mongoose choisira la collection
// dont le nom est le plus proche
module.exports = mongoose.model('assignments', AssignmentSchema);
