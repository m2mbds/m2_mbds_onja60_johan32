let Matiere = require('../model/matiere');

function getMatieresSansPagination(req, res){
    Matiere.find((err, matieres) => {
        if(err){
            res.send(err)
        }

        res.send(matieres);
    });
}

function getMatieres(req, res) {
    var aggregateQuery = Matiere.aggregate();
    
    Matiere.aggregatePaginate(aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      },
      (err, matieres) => {
        if (err) {
          res.send(err);
        }
        res.send(matieres);
      }
    );
   }

   function getMatiere(req, res){
    let matiereId = req.params.id;

    Matiere.findOne({_id: matiereId}, (err, matiere) =>{
        if(err){res.send(err)}
        res.json(matiere);
    })
}


function postMatiere(req, res){
    console.log(req.body.note)
    let matiere = new Matiere();
    matiere.nom = req.body.nom;
    matiere.imageMatiere = req.body.imageMatiere;

    console.log("POST matiere reçu :");
    console.log(matiere)

    matiere.save( (err) => {
        if(err){
            res.send('cant post matiere ', err);
        }
        res.json({ message: `${matiere.nom} saved!`})
    })
}

module.exports = { getMatieresSansPagination, postMatiere, getMatiere };