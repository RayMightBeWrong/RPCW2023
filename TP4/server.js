var http = require('http')
var axios = require('axios')
var static = require('./static')
var templates = require('./templates')
const { parse } = require('querystring')

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

var server = http.createServer(function (req, res) {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": {
                    if(req.url == "/"){
                        axios.get("http://localhost:3000/to_do")
                            .then(response => {
                                to_do = response.data
                                axios.get("http://localhost:3000/done")
                                    .then(response => {
                                        done = response.data
                                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                        res.write(templates.tasksPage(to_do, done, d))
                                        res.end()
                                    })
                                    .catch(function(erro){
                                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                        res.write("<p> Error occurred: GET http://localhost:3000/done</p>")
                                        res.end()
                                    })
                            })
                            .catch(function(erro){
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p> Error occurred: GET http://localhost:3000/to_do</p>")
                                res.end()
                            })
                    }
                    break
                }

            case "POST": {
                if(req.url == '/'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            console.log(result)
                            axios.post("http://localhost:3000/to_do", {
                                    task : result.description,
                                    taskmaster : result.master,
                                    deadline : result.deadline
                                })
                                .then(response => {
                                    axios.get("http://localhost:3000/to_do")
                                        .then(response => {
                                            to_do = response.data
                                            axios.get("http://localhost:3000/done")
                                                .then(response => {
                                                    done = response.data
                                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                                    res.write(templates.tasksPage(to_do, done, d))
                                                    res.end()
                                                })
                                                .catch(function(erro){
                                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                                    res.write("<p> Error occurred: GET http://localhost:3000/done</p>")
                                                    res.end()
                                                })
                                        })
                                        .catch(function(erro){
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write("<p> Error occurred: GET http://localhost:3000/to_do</p>")
                                            res.end()
                                        })
                                })
                                .catch(function(erro){
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Error occurred: POST</p>")
                                    res.end()
                                })
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }

                else if (/^\/delete_td_(\d+)$/g.test(req.url)){
                    let match = req.url.match(/delete_td_(\d+)$/)
                    let id = parseInt(match[1])
                    url = "http://localhost:3000/to_do/" + id
                    axios.delete(url)
                        .then(() => {
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end('<head><meta http-equiv="Refresh" content="0;URL=http://localhost:7777/"/></head>') 
                        })
                }
                else if (/^\/delete_done_(\d+)$/g.test(req.url)){
                    let match = req.url.match(/delete_done_(\d+)$/)
                    let id = parseInt(match[1])
                    url = "http://localhost:3000/done/" + id
                    axios.delete(url)
                        .then(() => {
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end('<head><meta http-equiv="Refresh" content="0;URL=http://localhost:7777/"/></head>') 
                        })
                }
                else if (/^\/complete_(\d+)$/g.test(req.url)){
                    let match = req.url.match(/complete_(\d+)$/)
                    let id = parseInt(match[1])
                    url = "http://localhost:3000/to_do/" + id

                    axios.get(url)
                        .then(response => {
                            task = response.data
                            console.log(task)
                            axios.post("http://localhost:3000/done", {
                                    task : task.task,
                                    taskmaster : task.taskmaster,
                                    deadline : task.deadline,
                                    id : task.id
                                })
                                .then(() => {
                                    axios.delete(url)
                                        .then(() => {
                                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.end('<head><meta http-equiv="Refresh" content="0;URL=http://localhost:7777/"/></head>') 
                                        })
                                })
                                .catch(function(erro){
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p> Error occurred: GET http://localhost:3000/to_do</p>")
                                    res.end()
                                })

                            
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p> Error occurred: GET http://localhost:3000/to_do</p>")
                            res.end()
                        })
                }
                else if (/^\/edit_td_(\d+)$/g.test(req.url)){
                    let match = req.url.match(/edit_td_(\d+)$/)
                    let id = parseInt(match[1])
                    url = "http://localhost:3000/to_do/" + id

                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put(url, {
                                    id : id,
                                    task : result.description,
                                    taskmaster : result.master,
                                    deadline : result.deadline
                                })
                                .then(() => {
                                    res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end('<head><meta http-equiv="Refresh" content="0;URL=http://localhost:7777/"/></head>') 
                                })
                            }
                        })
                }
                else if (/^\/edit_done_(\d+)$/g.test(req.url)){
                    let match = req.url.match(/edit_done_(\d+)$/)
                    let id = parseInt(match[1])
                    url = "http://localhost:3000/done/" + id

                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put(url, {
                                    id : id,
                                    task : result.description,
                                    taskmaster : result.master,
                                    deadline : result.deadline
                                })
                                .then(() => {
                                    res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end('<head><meta http-equiv="Refresh" content="0;URL=http://localhost:7777/"/></head>') 
                                })
                            }
                        })
                }

                break
            }

            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})


server.listen(7777, ()=>{
    console.log("Server listening on 7777...")
})
