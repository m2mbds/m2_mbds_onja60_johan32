let Assignment = require('../model/assignment');
let AssignmentsSubject = require('../model/subjectAssignment');
// Récupérer tous les assignments (GET)
function getAssignmentsSansPagination(req, res){
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }

        res.send(assignments);
    });
}

function getAssignments(req, res) {
    var aggregateQuery = Assignment.aggregate();
    
    Assignment.aggregatePaginate(aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      },
      (err, assignments) => {
        if (err) {
          res.send(err);
        }
        

        res.send(assignments);
      }
    );
   }
   
// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;

    Assignment.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}

// Récupérer un assignment par son id (GET)
function getAssignmentByIdUser(req, res){
    let userId = req.params.idUser;

    AssignmentsSubject.findOne({idAuthor: userId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    console.log(req.body.profid)
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.title = req.body.title;
    assignment.description = req.body.description
    assignment.PJ = req.body.PJ
    assignment.idSubject = req.body.idSubject
    assignment.idAuthor = req.body.idAuthor
    assignment.note = req.body.note;
    assignment.remark = req.body.remark;
    assignment.isRender = req.body.isRender;
    assignment.limitDate = req.body.limitDate;
    assignment.createdAt = req.body.createdAt;
    assignment.renderedAt = req.body.renderedAt;
    
    // (req.body.note=== undefined)?assignment.note = null:assignment.note = req.body.note;
    // assignment.remarque = req.body.remarque;

    console.log("POST assignment reçu :");
    console.log(assignment)

  

    assignment.save((err) => {
        if(err){
            res.status(500).send('cant post assignment ');
            console.log(err)
        }
        else{
            res.json({ message: `${assignment.nom} saved!`})
        }
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.status(status).send(err)
        } else {
          res.json({message: assignment.nom + 'updated'})
        }

      // console.log('updated ', assignment)
    });

}

 async function joinAssignmentSubject(req, res) {
    var aggregateQuery = AssignmentsSubject.aggregate();
    
    AssignmentsSubject.aggregatePaginate(aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      },
      (err, assignments) => {
        if (err) {
          res.send(err);
        }
        

        res.send(assignments);
      }
    );

        


       
    }
    
   
   
// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;

    Assignment.findOne({_id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        else
        res.json(assignment);
    })
}


function getAssignmentwithJoin(req, res){
  let assignmentId = req.params.id;

  AssignmentsSubject.findOne({_id: assignmentId}, (err, assignment) =>{
      if(err){res.send(err)}
      else
      res.json(assignment);
  })
}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment,getAssignmentByIdUser,joinAssignmentSubject,getAssignmentwithJoin };
