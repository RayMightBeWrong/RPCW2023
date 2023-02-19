import json


rfile = open('mapa.json')
data = json.load(rfile)

cities = {}

for c in data['cidades']:
    cities[c['id']] = {
        'name': c['nome'],
        'population': c['população'],
        'description': c['descrição'],
        'district': c['distrito'],
        'links': []
    }

for link in data['ligações']:
    entry1 = (link['destino'], link['distância'])
    entry2 = (link['origem'], link['distância'])
    cities[link['origem']]['links'].append(entry1)
    cities[link['destino']]['links'].append(entry2)


cities = {k: v for k, v in sorted(cities.items(), key=lambda item: item[1]['name'])}

pagWeb = '''
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Mapa Virtual</h1>
        <table>
            <tr>
                <td width="30%" valign="top">
                    <!-- Lista com o índice -->
                    <a name="indice">
                    <h3>Índice</h3>
                    <ul>'''

for c in cities:
    pagWeb += f'''
                        <li>
                            <a href="#{c}">{cities[c]['name']}</a>
                        </li>'''

pagWeb += f'''
                    </ul>
                </td>
				<td width="70%">
					<!-- Informação das Cidades -->'''

for c in cities:
    pagWeb += f'''
                    <a name="{c}"/>
					    <h3>{cities[c]['name']}</h3>
					    <p><b>População:</b> {cities[c]['population']}</p>
					    <p><b>Descrição:</b> {cities[c]['description']}</p>
					    <p><b>Distrito:</b> {cities[c]['district']}</p>
                        <address><a href="#indice">[Voltar ao índice]</a></address>
                        <p><b>Ligações:</b></p>
                        <ul><small>'''
    links = []
    #for city in cities[c]['links']:
    #    print(cities[city[0]]['name'])
    #print()
    cities[c]['links'] = sorted(cities[c]['links'], key=lambda item: cities[item[0]]['name'])
    for l in cities[c]['links']:
        pagWeb += f'''
                            <li>
                                <a href="#{l[0]}">{cities[l[0]]['name']}: {l[1]}</a>
                            </li>'''
    pagWeb += '                        </small></ul>\n'
    pagWeb += '''
                    <center>
                        <hr width="80%"/>
                    </center>'''

pagWeb += f'''
					    <center>
					    	<hr width="80%"/>
					    </center>'''

pagWeb += f'''
				</td>
			</tr>
		</table>
	</body>
</html>
'''

print(pagWeb)

rfile.close()
