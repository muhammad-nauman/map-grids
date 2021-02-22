import geocoder
import json
import requests



coords = []
counter = 1;
processedCounter = 1;

f = open("compiled/compiled_f.json")
data = json.load(f)
for coord in data:
	print(counter)
	if counter > 14000:
		if(coord['count'] > 0):
			batch = []
			for c in coord['coords']:
				batch.append({
					"query": str(c['lat']) + ',' + str(c['lng']),
					"limit": 1,
				})
			params = { "batch": batch }
			# print(json = params)
			r = requests.post('http://api.positionstack.com/v1/reverse?access_key=b45fcf9ef72b16ec609e755cf87a5187', json=params)
			# g = geocoder.arcgis([coord['coords'][0]['lat'], coord['coords'][0]['lng']], method='reverse')
			response = r.json()
			# if g.country == 'PAK':
			# print(response)
			g = response['data']
			details = []
			for res in g:
				details.append({
					"place": res['name'],
					"province": res['region'],
					"county": res['county']
				})
			coord['details'] = details;
			coords.append(coord)
			print("processedCounter" + str(processedCounter))
			processedCounter += 1
		else:
			coord['details'] = []
			coords.append(coord)
	counter += 1
with open('processed/processed3.json', 'w') as outfile:
    json.dump(coords, outfile)

print('Its Done')
