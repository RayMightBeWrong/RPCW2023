from bs4 import BeautifulSoup

def attachStart(i):
    return f'''<!DOCTYPE html>
<html>
    <head>
        <title>Arquossítios</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Arqueossítio nº {i}</h1>'''

def attachEnd():
    return f'''
    </body>
</html>'''

def attachID(tag):
    return f'''
        <h2>Identificação: {tag.identi.text}<h2>'''

def attachTextWithTitle(title, text):
    return f'''
        <p><b>{title}:</b> {text}</p>'''


arqfile = open('arq.xml')
soup = BeautifulSoup(arqfile, 'lxml')

elems = soup.arqsits
elem = elems.select('arqelem')
i = 1

for tags in elem:
    total_tags = [tag.name for tag in tags.find_all()]
    webPage = attachStart(i)
    for t in total_tags:
        if t == 'identi':
            webPage += attachID(tags)
        elif t == 'descri':
            webPage += attachTextWithTitle('Descrição', tags.descri.text)
        elif t == 'lugar':
            webPage += attachTextWithTitle('Lugar', tags.lugar.text)
        elif t == 'fregue':
            webPage += attachTextWithTitle('Freguesia', tags.fregue.text)
        elif t == 'concel':
            webPage += attachTextWithTitle('Concelho', tags.concel.text)
        elif t == 'codadm':
            webPage += attachTextWithTitle('CODADM', tags.codadm.text)
        elif t == 'latitu':
            webPage += attachTextWithTitle('Latitude', tags.latitu.text)
        elif t == 'longit':
            webPage += attachTextWithTitle('Longitude', tags.longit.text)
        elif t == 'altitu':
            webPage += attachTextWithTitle('Altitude', tags.altitu.text)
        elif t == 'acesso':
            webPage += attachTextWithTitle('Acesso', tags.acesso.text)
        elif t == 'quadro':
            webPage += attachTextWithTitle('Quadro', tags.quadro.text)
        elif t == 'desarq':
            webPage += attachTextWithTitle('DESARQ', tags.desarq.text)
        elif t == 'interp':
            webPage += attachTextWithTitle('INTERP', tags.interp.text)
        elif t == 'deposi':
            webPage += attachTextWithTitle('DEPOSI', tags.deposi.text)
        elif t == 'biblio':
            webPage += attachTextWithTitle('Referência', tags.biblio.text)
        elif t == 'autor':
            webPage += attachTextWithTitle('Autor', tags.autor.text)
        elif t == 'data':
            webPage += attachTextWithTitle('Data', tags.data.text)
        else:
            pass
    webPage += attachEnd()
    wfilename = 'html_files/arq' + str(i) + '.html'
    wfile = open(wfilename, 'w')
    wfile.write(webPage)
    wfile.close()
    i += 1