var mongoose = require('mongoose')

var moradaSchema = new mongoose.Schema({
    cidade: String,
    distrito: String
})

var partidoSchema = new mongoose.Schema({
    party_abbr: String,
    party_name: String
})

var atributosSchema = new mongoose.Schema({
    fumador: Boolean,
    gosta_cinema: Boolean,
    gosta_viajar: Boolean,
    acorda_cedo: Boolean,
    gosta_ler: Boolean,
    gosta_musica: Boolean,
    gosta_comer: Boolean,
    gosta_animais_estimacao: Boolean,
    gosta_dancar: Boolean,
    comida_favorita: String
})

var personSchema = new mongoose.Schema({
    id: String,
    nome: String,
    BI: String,
    idade: Number,
    sexo: String,
    descrição: String,
    morada: moradaSchema,
    partido_politico: partidoSchema,
    religiao: String,
    profissao: String,
    desportos: Array,
    animais: Array,
    figura_publica_pt: Array,
    marca_carro: String,
    destinos_favoritos: Array,
    atributos: atributosSchema
})

module.exports = mongoose.model('pessoa', personSchema)