exports.replaceSpaces = function(word){
    var res = ''

    for(let i = 0; i < word.length; i++){
        if (word[i] == '%' && word[i + 1] == '2' && word[i + 2] == '0'){
            i += 2
            res += ' '
        }
        else{
            res += word[i]
        }
    }

    return res
}

exports.filterNFirst = function(list, n){
    var res = []

    for(let i = 0; i < list.length && i < n; i++){
        res.push(list[i])
    }

    return res
}