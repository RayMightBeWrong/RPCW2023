var nrD = 0
var nrA = 0
var nrPF = 0
var nrFD = 0

function add(id, title, extra){
    switch(id){
        case 'desporto':
            nrD += 1
            nr = nrD
            break
        
        case 'animal':
            nrA += 1
            nr = nrA
            break
        
        case 'pf':
            nrPF += 1
            nr = nrPF
            break
    
        case 'fd':
            nrFD += 1
            nr = nrFD
            break
    }

    const div = document.getElementById(id + 's')
    
    const label = document.createElement('label')
    if (extra)
        label.textContent = 'Extra ' + title + ' ' + nr
    else
        label.textContent = title + ' ' + nr
    label.id = 'l' + id + nr

    const input = document.createElement('input')
    input.type = 'text'
    input.name = id + nr
    input.id = 'i' + id + nr

    const br = document.createElement('br')
    br.id = 'br' + id + nr

    div.appendChild(label)
    div.appendChild(input)
    div.appendChild(br)
}

function del(id){
    switch(id){
        case 'desporto':
            nr = nrD
            if (nrD > 0)
                nrD -= 1
            break
        
        case 'animal':
            nr = nrA
            if (nrA > 0)
                nrA -= 1
            break
        
        case 'pf':
            nr = nrPF
            if (nrPF > 0)
                nrPF -= 1
            break
    
        case 'fd':
            nr = nrFD
            if (nrFD > 0)
                nrFD -= 1
            break
    }

    const div = document.getElementById(id + 's')
    const label = document.getElementById('l' + id + nr)
    const input = document.getElementById('i' + id + nr)
    const br = document.getElementById('br' + id + nr)

    div.removeChild(label)
    div.removeChild(input)
    div.removeChild(br)
}