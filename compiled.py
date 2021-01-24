import json

compiled = [];
for index in ['1', '2', '3']:
	f = open("data/" + index + ".json")
	data = json.load(f)
	compiled = compiled + data

print(len(compiled))

with open('compiled/compiled_f.json', 'w') as outfile:
	json.dump(compiled, outfile)