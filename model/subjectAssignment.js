let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const subject = require('./subject');


let assignmentsSubjectSchema = Schema({
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
    renderedAt: Date,
    SubjectData:Object,
    TeacherSubjectData:Object,
    UserData:Object,

}, { collection: 'assignmentsSubjectUserView' });

assignmentsSubjectSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
// le nom de la collection (par défaut assignments) sera au pluriel, 
// soit assignments
// Si on met un nom "proche", Mongoose choisira la collection
// dont le nom est le plus proche
module.exports = mongoose.model('assignmentsSubjectUserView', assignmentsSubjectSchema);
