var http = require('http')
var url = require('url')
var fs = require('fs')

var server = http.createServer(function (req, res){
    var numPag = req.url.substring(1,4)
    console.log(numPag)

    fs.readFile('xml_files/arq' + numPag + '.xml', function(err, data){
        res.writeHead(200, {'Content-Type': 'text/xml'})
        if (err){
            res.write("<?xml version=\"1.0\" encoding=\"windows-1252\"?><erro>That's rough buddy.</erro>")
        }
        else{
            res.write(data)
        }
        res.end()
    })
})

server.listen(7777)
console.log('Servidor à escuta na porta 7777...')