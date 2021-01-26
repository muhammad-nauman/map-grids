import geocoder
import json



coords = []
counter = 1;

f = open("data/coords9.json")
data = json.load(f)
for coord in data:
	print(counter)
	g = geocoder.arcgis([coord[0]['lat'], coord[0]['lng']], method='reverse')
	if g.country == 'PAK' or g.state == 'Jammu & Kashmir':
		coords.append(coord)
	counter += 1
with open('processed/processed9.json', 'w') as outfile:
    json.dump(coords, outfile)

print('Its Done')
