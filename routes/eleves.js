let Eleve = require('../model/eleve');

// Récupérer tous les assignments (GET)
function getElevesSansPagination(req, res){
    Eleve.find((err, eleves) => {
        if(err){
            res.send(err)
        }

        res.send(eleves);
    });
}

function getEleves(req, res) {
    var aggregateQuery = Eleve.aggregate();
    
    Eleve.aggregatePaginate(aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      },
      (err, eleves) => {
        if (err) {
          res.send(err);
        }
        res.send(eleves);
      }
    );
   }

   function getEleve(req, res){
    let eleveId = req.params.id;

    Eleve.findOne({_id: eleveId}, (err, eleve) =>{
        if(err){res.send(err)}
        res.json(eleve);
    })
}


function postEleve(req, res){
    console.log(req.body.note)
    let eleve = new Eleve();
    eleve.nom = req.body.nom;
    eleve.prenom = req.body.eleve;
    eleve.imageEleve = req.body.imageEleve;

    console.log("POST eleve reçu :");
    console.log(eleve)

    eleve.save( (err) => {
        if(err){
            res.send('cant post eleve ', err);
        }
        res.json({ message: `${eleve.nom} saved!`})
    })
}

module.exports = { getElevesSansPagination, postEleve, getEleve };