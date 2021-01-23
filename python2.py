import geocoder
import json



coords = []
counter = 1

f = open("data/coords2.json")
data = json.load(f)
for coord in data:
	print(counter)
	g = geocoder.arcgis([coord[0]['lat'], coord[0]['lng']], method='reverse')
	if g.country == 'PAK':
		coords.append(coord)
	counter += 1
with open('processed/processed2.json', 'w') as outfile:
    json.dump(coords, outfile)

print('Its Done')
