var person = require('../models/person')

// Person list
module.exports.list = () => {
    return person.find()
                .then(docs => {
                    docs.sort(function(a, b){
                        return a.nome.localeCompare(b.nome)
                    })
                    return docs
                })
                .catch(erro => {
                    return erro
                })
}

module.exports.getPerson = id => {
    return person.find({id: id})
                .then(student => {
                    console.log(student)
                    return student[0]
                })
                .catch(erro => {
                    return erro
                })
}

module.exports.deletePerson = id => {
    return person.find({id: id})
                .then(student => {
                    console.log(student)
                    return student[0]
                })
                .catch(erro => {
                    return erro
                })
}