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
                    return student[0]
                })
                .catch(erro => {
                    return erro
                })
}

function compileArray(body, id){
    var res = []

    nr = 1
    while(id + nr in body){
        res.push(body[id + nr])
        nr += 1
    }

    return res
}

function compileAtributos(body){
    res = {}
    
    if ('comida_favorita' in body)  res.comida_favorita = body.comida_favorita
    else                            res.comida_favorita = 'none'

    attributes = ['fumador', 'gosta_cinema', 'gosta_viajar', 'acorda_cedo', 'gosta_ler', 'gosta_musica', 'gosta_comer', 'gosta_animais_estimacao', 'gosta_dancar']
    for (i in attributes){
        if (attributes[i] in body)
            res[attributes[i]] = body[attributes[i]]
        else
            res[attributes[i]] = 'false'
    }

    return res
}

module.exports.addPerson = body => {
    morada = { cidade: body.cidade, distrito: body.distrito }

    partido_politico = { party_abbr: body.partido_abbr, party_name: body.partido_nome }

    personToAdd = {
        id: body.id,
        nome: body.nome,
        BI: body.BI,
        idade: body.idade,
        sexo: body.sexo,
        descrição: body.descricao,
        morada: morada,
        religiao: body.religiao,
        profissao: body.profissao,
        marca_carro: body.marca_carro,
        partido_politico: partido_politico,
        desportos: compileArray(body, 'desporto'),
        animais: compileArray(body, 'animal'),
        figura_publica_pt: compileArray(body, 'pf'),
        destinos_favoritos: compileArray(body, 'fd'),
        atributos: compileAtributos(body)
    }

    console.log(personToAdd)

    person.init()
    var data = new person(personToAdd)

    return data.save()
                .then(person => {
                    return person
                })
                .catch(error => {
                    return error
                })
}

module.exports.deletePerson = id => {
    return person.deleteOne({id: id})
                .then(student => {
                    console.log(student)
                    return student[0]
                })
                .catch(erro => {
                    return erro
                })
}