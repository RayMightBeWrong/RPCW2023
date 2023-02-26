from bs4 import BeautifulSoup
import re

def remove_spaces(text):
    words = list(text.split(" "))
    text = ''
    for i in range(0, len(words)):
        if words[i] != '':
            text += words[i]
            if i != len(words) - 1 and words[i+1] != '':
                text += ' '
    return text

arqfile = open('arq.xml')
soup = BeautifulSoup(arqfile, 'lxml')

elems = soup.arqsits
tags = elems.select('arqelem')
i = 1

sites = []
for tag in tags:
    sites.append((i, remove_spaces(tag.identi.text)))
    i += 1
sites = sorted(sites, key=lambda item: item[1])

total = 122
columns = 8
div = total // columns
resto = total % columns

webPage = '''
<!DOCTYPE html>
<html>
    <head>
        <title>Arquossítios</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Página de Arquossítios por ID</h1>
        <table>
            <tr>
'''
for c in range(0, columns):
    webPage += f'\t\t\t\t<td width="{100/columns}%" valign="top">\n'
    if c == columns-1:
        for i in range(div * c, total):
            webPage += '\t\t\t\t\t<p>'
            webPage += f'<address><a href="{sites[i][0]}">{sites[i][1]}</a></address>'
            webPage += '</p>\n'
    else:
        for i in range(div * c, div * (c+1)):
            webPage += '\t\t\t\t\t<p>'
            webPage += f'<address><a href="{sites[i][0]}">{sites[i][1]}</a></address>'
            webPage += '</p>\n'
    webPage += '\t\t\t\t</td>\n'

webPage += '\t\t\t</tr>\n'
webPage += '''\t\t</table>
    </body>
</html>
'''

print(webPage)