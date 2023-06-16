let TeacherSubject = require('../model/teacherSubject');

// Récupérer tous les assignments (GET)
function getTeacherSubjectsSansPagination(req, res){
    TeacherSubject.find((err, eleves) => {
        if(err){
            res.send(err)
        }

        res.send(eleves);
    });
}

function getTeacherSubjects(req, res) {
    var aggregateQuery = User.aggregate();
    
    TeacherSubject.aggregatePaginate(aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      },
      (err, teacher) => {
        if (err) {
          res.send(err);
        }
        res.send(teacher);
      }
    );
   }

   function getTeacherSubject(req, res){
    let teacherid = req.params.id;

    TeacherSubject.findOne({_id: teacherid}, (err, teacherSubject) =>{
        if(err){res.send(err)}
        res.json(teacherSubject);
    })
}


function postTeacherSubject(req, res){   
    let teacherSubject = new TeacherSubject();
    teacherSubject.idUser = req.body.idUser;
    teacherSubject.idSubject = req.body.idSubject;

    console.log("POST TeacherSubjects reçu :");
    console.log(eleve)

    teacherSubject.save( (err) => {
        if(err){
            res.send('cant post TeacherSubjects ', err);
        }
        res.json({ message: `${teacherSubject.nom} saved!`})
    })
}

module.exports = { getTeacherSubjectsSansPagination, postTeacherSubject, getTeacherSubject, getTeacherSubjects };