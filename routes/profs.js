let Prof = require('../model/prof');

function getProfsSansPagination(req, res){
    Prof.find((err, profs) => {
        if(err){
            res.send(err)
        }

        res.send(profs);
    });
}

function getProfs(req, res) {
    var aggregateQuery = Prof.aggregate();
    
    Prof.aggregatePaginate(aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      },
      (err, profs) => {
        if (err) {
          res.send(err);
        }
        res.send(profs);
      }
    );
   }

   function getProf(req, res){
    let Matiereid = req.params.id;

    Prof.findOne({idMatiere: Matiereid}, (err, prof) =>{
        if(err){res.send(err)}
        res.json(prof);
    })
}


function postProf(req, res){
    console.log(req.body.note)
    let prof = new Prof();
    prof.nom = req.body.nom;
    prof.prenom = req.body.prenom;
    prof.imageProf = req.body.imageProf;
    prof.idMatiere = req.body.idMatiere;

    console.log("POST prof reçu :");
    console.log(prof)

    prof.save( (err) => {
        if(err){
            res.send('cant post prof ', err);
        }
        res.json({ message: `${prof.nom} saved!`})
    })
}

module.exports = { getProfs, postProf, getProf };