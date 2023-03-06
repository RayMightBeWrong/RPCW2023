var http = require('http')
var url = require('url')
var axios = require('axios')
var mypages = require('./custom_pages')
var aux = require('./aux')
var fs = require('fs')

var server = http.createServer(function (req, res){
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + ' ' + req.url + ' ' + d)
    var dicURL = url.parse(req.url, true)

    if (dicURL.pathname === '/'){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.end(mypages.homePage())        
    }
    else if (dicURL.pathname === '/pessoas'){
        axios.get("http://localhost:3000/pessoas")
        .then(function(resp){
            var pessoas = resp.data
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end(mypages.lista(pessoas))
        })
        .catch(erro => {
            res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
            res.end('Erro: ' + erro)
            console.log('Erro axios: ' + erro)
        })
    }
    else if (dicURL.pathname === '/genero'){
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
    else if (dicURL.pathname === '/desporto'){
        axios.get("http://localhost:3000/pessoas")
            .then(function(resp){
                var pessoas = resp.data
                var sport_dic = new Object()

                for (let i = 0; i < pessoas.length; i++){
                    var desportos = pessoas[i].desportos
                    for (let j = 0; j < desportos.length; j++){
                        if (!(desportos[j] in sport_dic))
                            sport_dic[desportos[j]] = 1
                        else
                            sport_dic[desportos[j]] += 1
                    }
                }

                var dic_sorted = Object.keys(sport_dic).map(function(key) {
                    return [key, sport_dic[key]]
                })

                dic_sorted.sort(function(first, second) {
                    return second[1] - first[1] // first[0].localeCompare(second[0]);
                })
                
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.sportDistribution(dic_sorted))
            })
            .catch(erro => {
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('Erro: ' + erro)
                console.log('Erro axios: ' + erro)
            })
    }
    else if (dicURL.pathname === '/trabalho'){
        axios.get("http://localhost:3000/pessoas")
            .then(function(resp){
                var pessoas = resp.data
                var work_dic = new Object()

                for (let i = 0; i < pessoas.length; i++){
                    var work = pessoas[i].profissao
                    if (!(work in work_dic))
                        work_dic[work] = 1
                    else
                        work_dic[work] += 1
                }

                var dic_sorted = Object.keys(work_dic).map(function(key) {
                    return [key, work_dic[key]]
                })

                dic_sorted.sort(function(first, second) {
                    return second[1] - first[1]
                })

                dic_sorted = aux.filterNFirst(dic_sorted, 10)

                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.workDistribution(dic_sorted))
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
                res.end(mypages.lista(pessoas))
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
                res.end(mypages.lista(pessoas))
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
                res.end(mypages.lista(pessoas))
            })
            .catch(erro => {
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('Erro: ' + erro)
                console.log('Erro axios: ' + erro)
            })
    }
    else if (dicURL.pathname.substring(1,7) === 'sport_'){
        var sport = dicURL.pathname.substring(7,40)
        sport = aux.replaceSpaces(sport)
        var path = 'http://localhost:3000/pessoas?desporto=' + sport

        axios.get(path)
            .then(function(resp){
                var pessoas = resp.data
                var filtered = []

                for(let i = 0; i < pessoas.length; i++){
                    if (pessoas[i].desportos.includes(sport)){
                        filtered.push(pessoas[i])
                    }
                }

                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.lista(filtered))
            })
            .catch(erro => {
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('Erro: ' + erro)
                console.log('Erro axios: ' + erro)
            })
    }
    else if (dicURL.pathname.substring(1,6) === 'work_'){
        var work = dicURL.pathname.substring(6,80)
        work = aux.replaceSpaces(work)
        var path = 'http://localhost:3000/pessoas?profissao=' + work

        console.log(work)

        axios.get(path)
            .then(function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.lista(pessoas))
            })
            .catch(erro => {
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('Erro: ' + erro)
                console.log('Erro axios: ' + erro)
            })
    }
    else if (dicURL.pathname.substring(1,4) === 'id_'){
        var id = dicURL.pathname.substring(4,10)
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
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
        res.end('Erro: ' + erro)
    }

})

server.listen(7777)
console.log('Servidor à escuta na porta 7777...')