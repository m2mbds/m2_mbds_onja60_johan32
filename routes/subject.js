let Subject = require('../model/subject');

function getSubjectsSansPagination(req, res) {
  Subject.find((err, subject) => {
    if (err) {
      res.send(err)
      console.log(err)
    }
    console.log('tafiditra')
    res.send(subject);
  });
}

function getSubjects(req, res) {
  var aggregateQuery = Subject.aggregate();

  Subject.aggregatePaginate(aggregateQuery,
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

function getSubject(req, res) {
  let subjectId = req.params.id;

  Subject.findOne({ id: subjectId }, (err, subject) => {
    if (err) { console.log(err);res.send(err) }
    else
    res.json(subject);
  })
}


function postSubject(req, res) {
  console.log(req.body.note)
  let subject = new Subject();
  subject.designation = req.body.designation;
  subject.picture = req.body.picture;

  console.log("POST subject reçu :");
  console.log(subject)

  subject.save((err) => {
    if (err) {
      res.send('cant post subject ', err);
    }
    res.json({ message: `${subject.designation} saved!` })
  })
}

module.exports = { getSubjectsSansPagination, postSubject, getSubject, getSubjects };