let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');
// let eleve = require('./routes/eleves');
// let matiere = require('./routes/matieres');
// let prof = require('./routes/profs');
let subject = require('./routes/subject');
let user = require('./routes/users');
let teacherSubject = require('./routes/teacherSubjects');
const uploadRouter = require('./routes/router.js');
var cors = require('cors');
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(uploadRouter)
app.use(cors())

//mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
const uri = 'mongodb+srv://M2_MBDS_Binome_Onja_60_Johan_32:SoMOLdBy7Ffb15hu@cluster0.uooqryc.mongodb.net/assignments?retryWrites=true&w=majority';
const multipart = require('connect-multiparty');
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:8010/api/assignments que cela fonctionne")
  },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

app.route(prefix + '/assignments')
  .get(assignment.getAssignments)
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);

app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);



// app.route(prefix + '/eleves')
//   .get(eleve.getElevesSansPagination)
//   .post(eleve.postEleve)

// app.route(prefix + '/eleves/:id')
//   .get(eleve.getEleve)

// app.route(prefix + '/matieres')
//   .get(matiere.getMatieresSansPagination)
//   .post(matiere.postMatiere)

// app.route(prefix + '/matieres/:id')
//   .get(matiere.getMatiere)

// app.route(prefix + '/profs')
//   .get(prof.getProfs)
//   .post(prof.postProf)

// app.route(prefix + '/profs/:id')
//   .get(prof.getProf)

app.route(prefix + '/subjects')
  .get(subject.getSubjectsSansPagination)
  .post(subject.postSubject)

app.route(prefix + '/subjects/:id')
  .get(subject.getSubject)

app.route(prefix + '/users')
  .get(user.getUsers)
  .post(user.postUser)

app.route(prefix + '/users/:id')
  .get(user.getUser)

app.route(prefix + '/usersAuthentification')
  .post(user.getAuthentificationUser)


app.route(prefix + '/teacherSubjects')
  .get(teacherSubject.getTeacherSubjectsSansPagination)
  .post(teacherSubject.postTeacherSubject)

app.route(prefix + '/teacherSubjects/:id')
  .get(teacherSubject.getTeacherSubject)


const multipartMiddleware = multipart({
  uploadDir: './uploads'
});



// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);



module.exports = app;


