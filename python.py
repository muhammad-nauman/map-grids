import geocoder
import json


coords1 = []
coords2 = []
coords3 = []
coords4 = []
coords5 = []
coords6 = []
coords7 = []
coords8 = []
coords9 = []
coords10 = []
counter = 1;

f = open("coords1.json")
data = json.load(f)
for coord in data:
	print(counter)
	g = geocoder.arcgis([coord[0]['lat'], coord[0]['lng']], method='reverse')
	if g.country == 'PAK':
		coords.append(i)
counter += 1
with open('filtered1.json', 'w') as outfile:
    json.dump(coords, outfile)

print('Its Done')
