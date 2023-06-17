let User = require('../model/user');

// Récupérer tous les assignments (GET)
function getUsersSansPagination(req, res) {
    Eleve.find((err, eleves) => {
        if (err) {
            res.send(err)
        }

        res.send(eleves);
    });
}

function getUsers(req, res) {
    var aggregateQuery = User.aggregate();

    User.aggregatePaginate(aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
        },
        (err, User) => {
            if (err) {
                res.send(err);
            }
            res.send(User);
        }
    );
}

function getUser(req, res) {
    let userId = req.params.id;

    User.findOne({ _id: userId }, (err, user) => {
        if (err) {
            console.log(err)
            res.send(err)            
        }
        res.json(user);
    })
}

function getAuthentificationUser(req, res) {
    let userEmail = req.body.email;
    let userPassword = req.body.password;
    console.log(userEmail)
    console.log(userPassword)
    User.findOne({ email: userEmail, password: userPassword }, (err, userAuth) => {
        if (err) { res.send(err) }
        res.json(userAuth);
    })
}


function postUser(req, res) {
    let user = new User();
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.picture = req.body.picture;
    user.email = req.body.email;
    user.password = req.body.password;
    user.isAdmin = req.body.isAdmin;
    user.role = req.body.role;

    console.log("POST user reçu :");
    console.log(eleve)

    user.save((err) => {
        if (err) {
            res.send('cant post user ', err);
        }
        res.json({ message: `${eleve.nom} saved!` })
    })
}

module.exports = { getUsersSansPagination, postUser, getUser, getUsers,getAuthentificationUser };