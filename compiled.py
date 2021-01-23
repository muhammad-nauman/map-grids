import json

compiled = [];
for index in ['1', '2', '3', '4', '5', '6', '7', '8', '9']:
	f = open("processed/processed" + index + ".json")
	data = json.load(f)
	compiled = compiled + data

print(len(compiled))

with open('compiled/compiled.json', 'w') as outfile:
	json.dump(compiled, outfile)