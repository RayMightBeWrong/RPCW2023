var http = require('http')
var url = require('url')
var fs = require('fs')

var server = http.createServer(function (req, res){
    if (req.url === '/'){
        fs.readFile('index.html', function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html'})
            if (err){
                res.write(err)
            }
            else{
                res.write(data)
            }
            res.end()
        })
    }
    else{
        var numPag = req.url.substring(1,4)
        fs.readFile('html_files/arq' + numPag + '.html', function(err, data){
        //fs.readFile('xml_files/arq' + numPag + '.xml', function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html'})
            //res.writeHead(200, {'Content-Type': 'text/xml'})
            if (err){
                res.write(err)
            }
            else{
                res.write(data)
            }
            res.end()
        })
    }
})

server.listen(7777)
console.log('Servidor à escuta na porta 7777...')