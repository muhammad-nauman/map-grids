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


f = open("source/new_coordinates7x7.json")
data = json.load(f)
dataSetQuantity = len(data) / 10

for coord in data:
	if(counter <= dataSetQuantity):
		coords1.append(coord)
	if(counter > dataSetQuantity and counter <= (dataSetQuantity * 2)):
		coords2.append(coord)
	if(counter > (dataSetQuantity * 2) and counter <= (dataSetQuantity * 3)):
		coords3.append(coord)
	if(counter > (dataSetQuantity * 3) and counter <= (dataSetQuantity * 4)):
		coords4.append(coord)
	if(counter > (dataSetQuantity * 4) and counter <= (dataSetQuantity * 5)):
		coords5.append(coord)
	if(counter > (dataSetQuantity * 5) and counter <= (dataSetQuantity * 6)):
		coords6.append(coord)
	if(counter > (dataSetQuantity * 6) and counter <= (dataSetQuantity * 7)):
		coords7.append(coord)
	if(counter > (dataSetQuantity * 7) and counter <= (dataSetQuantity * 8)):
		coords8.append(coord)
	if(counter > (dataSetQuantity * 8) and counter <= (dataSetQuantity * 9)):
		coords9.append(coord)
	if(counter > (dataSetQuantity * 9)):
		coords10.append(coord)
	print(counter)
	counter += 1

with open('data/coords1.json', 'w') as outfile1:
    json.dump(coords1, outfile1)
with open('data/coords2.json', 'w') as outfile2:
    json.dump(coords2, outfile2)
with open('data/coords3.json', 'w') as outfile3:
    json.dump(coords3, outfile3)
with open('data/coords4.json', 'w') as outfile4:
    json.dump(coords4, outfile4)
with open('data/coords5.json', 'w') as outfile5:
    json.dump(coords5, outfile5)
with open('data/coords6.json', 'w') as outfile6:
    json.dump(coords6, outfile6)
with open('data/coords7.json', 'w') as outfile7:
    json.dump(coords7, outfile7)
with open('data/coords8.json', 'w') as outfile8:
    json.dump(coords8, outfile8)
with open('data/coords9.json', 'w') as outfile9:
    json.dump(coords9, outfile9)
with open('data/coords10.json', 'w') as outfile10:
    json.dump(coords10, outfile10)
print('Its Done')
