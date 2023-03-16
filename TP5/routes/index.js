var express = require('express');
var router = express.Router();

var tasks = require('../controllers/tasks')

/* GET home page. */
router.get('/', function(req, res, next) {
    tasks.listToDo()
        .then(to_do => {
            tasks.listDone()
                .then(done => {
                    res.render('index', { 
                        d: new Date().toISOString().substring(0, 16),
                        to_do: to_do,
                        done: done
                    })
                })
                .catch(error => {
                    res.render('error', { error: error })
                })
        })
        .catch(error => {
            res.render('error', { error: error })
        })
})

router.post('/', function(req, res) {
    tasks.addToDo(req.body)
        .then(task => {
            res.redirect('back')
        })
        .catch(error => {
            res.render('error', {error: error})
        })
})

router.post('/complete/:idTask', function(req, res) {
    tasks.getToDo(req.params.idTask)
        .then(task => {
            tasks.completeTask(task)
                .then(task => {
                    res.redirect('back')
                })
                .catch(error => {
                    res.render('error', {error: error})
                })
        })
        .catch(error => {
            res.render('error', {error: error})
        })
})

router.post('/delete/td/:idTask', function(req, res) {
    tasks.deleteToDo(req.params.idTask)
        .then(task => {
            res.redirect('back')
        })
        .catch(error => {
            res.render('error', {error: error})
        })
})

router.post('/delete/done/:idTask', function(req, res) {
    tasks.deleteDone(req.params.idTask)
        .then(task => {
            res.redirect('back')
        })
        .catch(error => {
            res.render('error', {error: error})
        })
})

router.post('/edit/td/:idTask', function(req, res) {
    tasks.editToDo(req.params.idTask, req.body)
        .then(task => {
            res.redirect('back')
        })
        .catch(error => {
            res.render('error', {error: error})
        })
})

router.post('/edit/done/:idTask', function(req, res) {
    tasks.editDone(req.params.idTask, req.body)
        .then(task => {
            res.redirect('back')
        })
        .catch(error => {
            res.render('error', {error: error})
        })
})

module.exports = router;
