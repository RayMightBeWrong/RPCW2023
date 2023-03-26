var express = require('express');
var router = express.Router();
var person = require('../controllers/person')

/* GET home page. */
router.get('/', function(req, res, next) {
    person.list()
        .then(people => {
            res.render('index', {
                date: new Date().toISOString().substring(0, 16),
                list: people
            })  
        })
        .catch(erro => {
            res.render('error', {error: erro, message: "Error occurred while obtaining list of people."})
        })
})

router.get('/people/register', function(req, res, next){
    res.render('addPersonForm', {date: new Date().toISOString().substring(0, 16)})
})

router.get('/people/:idPerson', function(req, res, next){
    person.getPerson(req.params.idPerson)
        .then(person => {
            res.render('person', {
                date: new Date().toISOString().substring(0, 16),
                p: person
            })
        })
        .catch(erro => {
            res.render('error', {error: erro, message: "Error occurred while obtaining person."})
        })
})

router.get('/people/delete/:idPerson', function(req, res, next){
    person.getPerson(req.params.idPerson)
        .then(person => {
            res.render('deletePersonForm', {
                date: new Date().toISOString().substring(0, 16),
                p: person
            })
        })
        .catch(erro => {
            res.render('error', {error: erro, message: "Error occurred while obtaining person."})
        })
})

router.get('/people/delete/:idPerson/confirm', function(req, res, next){
    person.deletePerson(req.params.idPerson)
        .then(resposta => {
            res.redirect('/')
        })
        .catch(erro => {
            res.render('error', {error: erro, message: "Error occurred while deleting person."})
        })
})

router.get('/people/edit/:idPerson', function(req, res, next){
    person.getPerson(req.params.idPerson)
        .then(person => {
            console.log(person)
            res.render('editPersonForm', {
                date: new Date().toISOString().substring(0, 16),
                p: person
            })
        })
        .catch(erro => {
            res.render('error', {error: erro, message: "Error occurred while obtaining person."})
        })
})

router.post('/people/edit/:idPerson', (req,res) => {
    console.log(req.body)
    person.editPerson(req.params.idPerson, req.body)
        .then(person => {
            res.redirect('/')
        })
        .catch(erro => {
            res.render('error', {error: erro, message: "Error occurred while adding person."})
        })
})

router.post('/people/register', (req,res) => {
    person.addPerson(req.body)
        .then(person => {
            console.log(person)
            res.redirect('/')
        })
        .catch(erro => {
            res.render('error', {error: erro, message: "Error occurred while adding person."})
        })
})

module.exports = router;