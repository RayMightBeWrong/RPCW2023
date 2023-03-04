var http = require('http')
var url = require('url')
var axios = require('axios')
var mypages = require('./custom_pages')
var fs = require('fs')

var server = http.createServer(function (req, res){
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + ' ' + req.url + ' ' + d)
    var dicURL = url.parse(req.url, true)
    if (dicURL.pathname === '/'){
        /* 
        lista das pessoas

        axios.get("http://localhost:3000/pessoas")
            .then(function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.homePage(pessoas))
            })
            .catch(erro => {
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('Erro: ' + erro)
                console.log('Erro axios: ' + erro)
            })
        */

        // distribuição por género
        axios.get("http://localhost:3000/pessoas?sexo=masculino")
            .then(function(resp){
                var male_nr = resp.data.length
                axios.get("http://localhost:3000/pessoas?sexo=feminino")
                    .then(function(resp){
                        var female_nr = resp.data.length
                        axios.get("http://localhost:3000/pessoas?sexo=outro")
                            .then(function(resp){
                                var other_nr = resp.data.length
                                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                                res.end(mypages.genderDistribution(male_nr, female_nr, other_nr))
                            })
                            .catch(erro => {
                                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                                res.end('Erro: ' + erro)
                                console.log('Erro axios: ' + erro)
                            })
                    })
                    .catch(erro => {
                        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end('Erro: ' + erro)
                        console.log('Erro axios: ' + erro)
                    })
            })
            .catch(erro => {
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('Erro: ' + erro)
                console.log('Erro axios: ' + erro)
            })
    }
    else if (dicURL.pathname === '/masculino'){
        axios.get("http://localhost:3000/pessoas?sexo=masculino")
            .then(function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.homePage(pessoas))
            })
            .catch(erro => {
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('Erro: ' + erro)
                console.log('Erro axios: ' + erro)
            })
    }
    else if (dicURL.pathname === '/feminino'){
        axios.get("http://localhost:3000/pessoas?sexo=feminino")
            .then(function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.homePage(pessoas))
            })
            .catch(erro => {
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('Erro: ' + erro)
                console.log('Erro axios: ' + erro)
            })
    }
    else if (dicURL.pathname === '/outro'){
        axios.get("http://localhost:3000/pessoas?sexo=outro")
            .then(function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.homePage(pessoas))
            })
            .catch(erro => {
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('Erro: ' + erro)
                console.log('Erro axios: ' + erro)
            })
    }
    else if (dicURL.pathname === '/w3.css'){
        res.writeHead(200, {'Content-Type': 'text/css; charset=utf-8'})
        fs.readFile('w3.css', function(err, data){
            if (err){
                console.log('Erro na leitura da stylesheet')
                res.write('Erro: ' + err)
            }
            else
                res.write(data)
            res.end()
        })
    }
    else{
        var id = dicURL.pathname.substring(1,7)
        var path = 'http://localhost:3000/pessoas?id=' + id
        axios.get(path)
            .then(function(resp){
                var data = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.personPage(data[0]))
            })
            .catch(erro => {
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('Erro: ' + erro)
                console.log('Erro axios: ' + erro)
            })
    }
})

server.listen(7777)
console.log('Servidor à escuta na porta 7777...')