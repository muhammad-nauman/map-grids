import json

compiled = [];
for index in ['1', '2', '3']:
	f = open("processed/processed" + index + ".json")
	data = json.load(f)
	compiled = compiled + data

print(len(compiled))

with open('compiled/compiled_p.json', 'w') as outfile:
	json.dump(compiled, outfile)