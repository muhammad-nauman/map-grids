function initialize() {
  var mapProp = {
    center: myCenter,
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scaleControl: true
  };

  map = new google.maps.Map(document.getElementById('map'), mapProp);
        var gridsize = 0.008 * 7; //Grid size in degrees

        let startingPoint = [22.960094, 60.501127];
        let initialCoords = [22.960094, 60.501127];

        [...Array(270).keys()].map((key, rowIndex) => {
        	initialCoords = startingPoint;
        	[...Array(230).keys()].map((key, lineIndex) => {
            let c = [{lat: initialCoords[0], lng: initialCoords[1]}];
		        // setTimeout(function() {
		   //      	fetch('http://api.positionstack.com/v1/reverse?access_key=d762a891f0cfa9b5867adb4f8c2493df&query=' +initialCoords[0] + ',' + initialCoords[1])
					// .then(response => response.json())
					// .then(data => {
					// 	if(data.length > 0 && data[0].country === 'Pakistan') {
           [...Array(3).keys()].map((key, i) => {
            let nextCoords = directions[getDirection(i)](initialCoords)
            if(i===0 && lineIndex === 0) {
             startingPoint = nextCoords
           }
           initialCoords = nextCoords
           c.push({lat: nextCoords[0], lng: nextCoords[1]})
         })
					// 	}
					// });
					if(c.length === 4) polygons.push(c);
		        // }, 500)
		        
		        // c.push({lat: initialCoords[0], lng: initialCoords[1]})
         })
        })
        console.log(polygons.length)
        download(JSON.stringify(polygons), 'new_coordinates.json', 'application/json')
        map.data.add({
          geometry: new google.maps.Data.Polygon(polygons),
        });
        
        google.maps.event.addListener(map, 'bounds_changed', function() {

          var markerCluster = new MarkerClusterer(map, markers, {
            imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
          });
        });
      }
      var directions = {
       up: function(coord) {
        return goUp(coord)
      },
      right: function(coord) {
        return goRight(coord)
      },
      down: function(coord) {
        return goDown(coord)
      },
    }
    function printVerticalLines() {
    	let startingPoint = [36.9537903, 61.4415223];
      let initialCoords = [36.9537903, 61.4415223];
      drawLineArray = [...Array(100).keys()];
      numberOfLinesArray = [...Array(200).keys()];
      numberOfLinesArray.map((key, i) => {
       let firstPoint;
       if(i > 0) {
        firstPoint = goRight(initialCoords);
      } else {
        firstPoint = initialCoords
      }
      initialCoords = firstPoint;
      drawLineArray.map(key => {
       let coords = createCoord(initialCoords, 270, 7000)
       let polygon = new google.maps.Polyline({
        path: [{lat: initialCoords[0], lng: initialCoords[1]}, {lat: coords[0], lng: coords[1]}],
        map: map,
      })
       polygon.setOptions(gridstyle);
       initialCoords = coords;
     })
      initialCoords = firstPoint

    })
    }
    function printHorizontalLines() {
    	let startingPoint = [23.1027909, 61.5539133];
      let initialCoords = [23.1027909, 61.5539133];
      [...Array(200).keys()].map((key, i) => {
       let firstPoint;
       if(i > 0) {
        firstPoint = goUp(initialCoords);
      } else {
        firstPoint = initialCoords
      }
      initialCoords = firstPoint;
      [...Array(250).keys()].map(key => {
       let coords = createCoord(initialCoords, 0, 7000)
       let polygon = new google.maps.Polyline({
        path: [{lat: initialCoords[0], lng: initialCoords[1]}, {lat: coords[0], lng: coords[1]}],
        map: map,
      })
       polygon.setOptions(gridstyle);
       polygons.push(polygon);
       initialCoords = coords;
     })
      initialCoords = firstPoint

    })
    }
    function goDown(coord) {
    	const d = google.maps.geometry.spherical.computeOffset(new google.maps.LatLng({lat: coord[0], lng:coord[1]}), 7000, 270);
    	return [d.lat(), d.lng()];
    	// return createCoord(coord, 270, 3331)
    }
    function goRight(coord) {
    	const d = google.maps.geometry.spherical.computeOffset(new google.maps.LatLng({lat: coord[0], lng:coord[1]}), 7000, 0);
    	return [d.lat(), d.lng()];
    	// return createCoord(coord, 0, 7602);
    }
    function goUp(coord) {
    	const d = google.maps.geometry.spherical.computeOffset(new google.maps.LatLng({lat: coord[0], lng:coord[1]}), 7000, 90);
    	return [d.lat(), d.lng()];
    	// return createCoord(coord, 90, 3331)
    }
    function createCoord(coord, bearing, distance){
	    /** http://www.movable-type.co.uk/scripts/latlong.html
	     φ is latitude, λ is longitude, 
	     θ is the bearing (clockwise from north), 
	     δ is the angular distance d/R; 
	     d being the distance travelled, R the earth’s radius*
	     **/

       var 
	        radius = 6371e3, //meters
	        δ = Number(distance) / radius, // angular distance in radians
	        θ = Number(bearing).toRad();
	        φ1 = coord[1].toRad(),
	        λ1 = coord[0].toRad();

         var φ2 = Math.asin(Math.sin(φ1)*Math.cos(δ) + Math.cos(φ1)*Math.sin(δ)*Math.cos(θ));

         var λ2 = λ1 + Math.atan2(Math.sin(θ)*Math.sin(δ)*Math.cos(φ1), Math.cos(δ)-Math.sin(φ1)*Math.sin(φ2));

	    λ2 = (λ2+3*Math.PI) % (2*Math.PI) - Math.PI; // normalise to -180..+180°

	    return [λ2.toDeg(), φ2.toDeg()]; //[lon, lat]
   }
   Number.prototype.toDeg = function() { return this * 180 / Math.PI; }
   Number.prototype.toRad = function() { return this * Math.PI / 180; }

   function getDirection(index) {
    switch(index){
     case 0:
     return 'up';
     case 1:
     return 'right';
     case 2:
     return 'down';
   }
 }