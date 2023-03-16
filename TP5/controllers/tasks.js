const axios = require('axios')

module.exports.listToDo = () => {
    return axios.get('http://localhost:3000/to_do')
                .then(res => {
                    return res.data
                })
                .catch(erro => {
                    return erro
                })
}

module.exports.listDone = () => {
    return axios.get('http://localhost:3000/done')
                .then(res => {
                    return res.data
                })
                .catch(erro => {
                    return erro
                })
}

module.exports.getToDo = (id) => {
    return axios.get('http://localhost:3000/to_do/' + id)
                .then(res => {
                    return res.data
                })
                .catch(erro => {
                    return erro
                })
}

module.exports.getDone = (id) => {
    return axios.get('http://localhost:3000/done/' + id)
                .then(res => {
                    return res.data
                })
                .catch(erro => {
                    return erro
                })
}

module.exports.addToDo = (task) => {
    return axios.post('http://localhost:3000/to_do', task)
                .then(res => {
                    return res.data
                })
                .catch(erro => {
                    return erro
                })
}

module.exports.completeTask = (task) => {
    return axios.post('http://localhost:3000/done', task)
                .then(res => {
                    axios.delete('http://localhost:3000/to_do/' + task.id)
                        .then(res => {
                            return res.data
                        })
                        .catch(erro => {
                            return erro
                        })
                })
                .catch(erro => {
                    return erro
                })
}

module.exports.deleteToDo = (idTask) => {
    return axios.delete('http://localhost:3000/to_do/' + idTask)
                .then(res => {
                    return res.data
                })
                .catch(erro => {
                    return erro
                })
}

module.exports.deleteDone = (idTask) => {
    return axios.delete('http://localhost:3000/done/' + idTask)
                .then(res => {
                    return res.data
                })
                .catch(erro => {
                    return erro
                })
}

module.exports.editToDo = (task_id, task) => {
    task = {
        id: task_id,
        task: task.task,
        taskmaster: task.taskmaster,
        deadline: task.deadline
    }
    return axios.put('http://localhost:3000/to_do/' + task.id, task)
                .then(res => {
                    return res.data
                })
                .catch(erro => {
                    return erro
                })
}

module.exports.editDone = (task_id, task) => {
    task = {
        id: task_id,
        task: task.task,
        taskmaster: task.taskmaster,
        deadline: task.deadline
    }
    return axios.put('http://localhost:3000/done/' + task.id, task)
                .then(res => {
                    return res.data
                })
                .catch(erro => {
                    return erro
                })
}