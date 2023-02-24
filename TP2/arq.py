from bs4 import BeautifulSoup

arqfile = open('arq.xml')
soup = BeautifulSoup(arqfile, 'lxml')

elems = soup.arqsits
tags = elems.select('arqelem')
header = '<?xml version="1.0" encoding="windows-1252"?>\n'

i = 1
for tag in tags:
    wfilename = 'xml_files/arq' + str(i) + '.xml'
    wfile = open(wfilename, 'w')
    wfile.write(header)
    wfile.write(str(tag))
    i += 1
    wfile.close()