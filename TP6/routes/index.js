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
    /*
    person.list()
        .then(people => {
            res.render('register', {
                date: new Date().toISOString().substring(0, 16),
                list: people
            })  
        })
        .catch(erro => {
            res.render('error', {error: erro, message: "Erro na obtenção da página de registo de pessoa."})
        })
    */
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

module.exports = router;