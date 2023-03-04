exports.workDistribution = function(list){
    var pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <title>About people...</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="w3.css"> 
    </head>
    <body>
        <h1>Distribuição por Profissão</h1>
        <div class="table">
        <table class="w3-table-all w3-hoverable" border="1">
            <tr class="w3-teal">
                <th style="text-align:center;">Designação</th>
                <th style="text-align:center;">Número de Profissionais</th>
            </tr>
    `

    for(let i = 0; i < list.length; i++){
        pagHTML += `
            <tr>
                <td style="text-align:center;"><a style="text-decoration:none" href="/work_${list[i][0]}">${list[i][0]}</a></td>
                <td style="text-align:center;"><a style="text-decoration:none" href="/work_${list[i][0]}">${list[i][1]}</a></td>
            </tr>
    `
    }

    pagHTML += `
        </table>
        </div>
    </body>
</html>
    `

    return pagHTML
}

exports.sportDistribution = function(sport_list){
    var pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <title>About people...</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="w3.css"> 
    </head>
    <body>
        <h1>Distribuição por Desporto</h1>
        <div class="table">
        <table class="w3-table-all w3-hoverable" border="1">
            <tr class="w3-teal">
                <th style="text-align:center;">Designação</th>
                <th style="text-align:center;">Número de Praticantes</th>
            </tr>
    `

    for(let i = 0; i < sport_list.length; i++){
        pagHTML += `
            <tr>
                <td style="text-align:center;"><a style="text-decoration:none" href="/sport_${sport_list[i][0]}">${sport_list[i][0]}</a></td>
                <td style="text-align:center;"><a style="text-decoration:none" href="/sport_${sport_list[i][0]}">${sport_list[i][1]}</a></td>
            </tr>
    `
    }

    pagHTML += `
        </table>
        </div>
    </body>
</html>
    `

    return pagHTML
}

exports.genderDistribution = function(male, female, other){
    var pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <title>About people...</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="w3.css"> 
    </head>
    <body>
        <h1>Distribuição por Género</h1>
        <h3>Masculino: ${male} <a href="/masculino">Lista de Pessoas</a></h3>
        <h3>Feminino: ${female} <a href="/feminino">Lista de Pessoas</a></h3>
        <h3>Outro: ${other} <a href="/outro">Lista de Pessoas</a></h3>
    `

    pagHTML += `
    </body>
</html>
    `

    return pagHTML
}

exports.homePage = function(lista){
    var pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <title>About people...</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="w3.css"> 
    </head>
    <body>
        <h1>Lista de Pessoas</h1>
        <div class="table">
        <table class="w3-table-all w3-hoverable" border="1">
            <tr class="w3-teal">
                <th style="text-align:center;">ID</th>
                <th style="text-align:center;">Nome</th>
                <th style="text-align:center;">Idade</th>
                <th style="text-align:center;">Sexo</th>
                <th style="text-align:center;">Cidade</th>
            </tr>`

    for(let i=0; i < lista.length; i++){
        if (lista[i].morada != undefined)
            cidade = lista[i].morada.cidade
        else
            cidade = 'undefined'

        pagHTML += `
            <tr>
                <td style="text-align:center;"><a style="text-decoration:none" href="/id_${lista[i].id}">${lista[i].id}</a></td>
                <td style="text-align:center;"><a style="text-decoration:none" href="/id_${lista[i].id}">${lista[i].nome}</a></td>
                <td style="text-align:center;"><a style="text-decoration:none" href="/id_${lista[i].id}">${lista[i].idade}</a></td>
                <td style="text-align:center;"><a style="text-decoration:none" href="/id_${lista[i].id}">${lista[i].sexo}</a></td>
                <td style="text-align:center;"><a style="text-decoration:none" href="/id_${lista[i].id}">${cidade}</a></td>
            </tr>
        `
    }

    pagHTML += `
        </table>
        </div>
    </body>
</html>
    `
    return pagHTML
}

exports.personPage = function(person){
    //console.log(person)
    var pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <title>About people...</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="w3.css"> 
    </head>
    <body>
        <h1>${person.nome}</h1>
    </body>
</html>
    `

    return pagHTML
}