function drawFromJSON(data, doctors, onlySelected = false) {
    var mapProp = {
        center: myCenter,
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scaleControl: true
    };
    console.log(onlySelected)

    map = new google.maps.Map(document.getElementById('map'), mapProp);
    changeZoom = false
    let zoomCoord = [];
    data.map(coord => {
        if(onlySelected == true) {
            if(coord.isSelected == true) {
                let polygon = new google.maps.Polyline({
                    path: coord.coords,
                    map: map,
                })
                polygon.setOptions(selectedGrids)
                polygons.push(polygon);
            }
        } else {
            if(coord.isSelected == true) {
                coord.coords[4] = coord.coords[0]
            }
            let polygon = new google.maps.Polyline({
                    path: coord.coords,
                    map: map,
                })
                polygon.setOptions(selectedGrids)
                if(coord.isSelected) {
                    changeZoom = true
                    zoomCoord = coord.coords[0]
                    polygon.setOptions(selectedGrids)
                } else {
                    polygon.setOptions(coord.containsDoctors === true ? gridstyleWithDoctors : gridstyle);
                }
                if(coord.containsDoctors === true) {
                    GRIDS_WITH_DOCTORS.push(coord)
                }
                polygons.push(polygon);
        }
        
        return coord
    })
    if(changeZoom === true) {
        myCenter = new google.maps.LatLng(zoomCoord.lat, zoomCoord.lng)
        console.log(zoomCoord)
        map.setCenter(myCenter)
        map.setZoom(10)
    }
        // const slicedPolygons = polygons.slice(13600, 21000)
        // const slicedCoords = data.slice(13600, 21000)
        // let d = [];
        // let exist = false
        // let count = 0

        // slicedPolygons.map((polygon, index) => {
        //     console.log(index)
        //     for (const doctor of doctors) {
        //         exist = google.maps.geometry.poly.containsLocation(
        //             new google.maps.LatLng(doctor.Latitude, doctor.Longitude),
        //             polygon
        //         )
        //         if(exist === true) count++;
        //     }
        //     d[index] = {
        //         count,
        //         coords: slicedCoords[index],
        //         containsDoctors: count > 0,
        //     }
        //     exist = false
        //     count = 0
        //     return polygon
        // })

        // console.log('modified', d)
        // download(JSON.stringify(d), '3.json', 'application/json')
        doctors.map(function(doctor) {
            const addedMarkers = markers.filter(marker => {
                marker.label === `${doctor.DoctorName}-${doctor.DoctorCode}`
            })
            if (addedMarkers.length === 0) {
                var markerposition = { lat: doctor.Latitude, lng: doctor.Longitude };
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(markerposition.lat, markerposition.lng),
                    label: `${doctor.DoctorName}-${doctor.DoctorCode}`
                });
                markers.push(marker);
            }
        });
        google.maps.event.addListener(map, 'bounds_changed', function() {
            var markerCluster = new MarkerClusterer(map, markers, {
                imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
            });
        });
    }

    function drawFromCities(data, doctors, withAllLabels = false) {
        var mapProp = {
            center: myCenter,
            zoom: 6,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scaleControl: true
        };

        map = new google.maps.Map(document.getElementById('map'), mapProp);
        changeZoom = false
        let zoomCoord = [];

        data.map(coord => {
            
        const start = new google.maps.LatLng(coord.coords[0].lat, coord.coords[0].lng)
        const end = new google.maps.LatLng(coord.coords[2].lat, coord.coords[2].lng)
        const center = google.maps.geometry.spherical.interpolate(start, end, 0.5)
            if(coord.isSelected == true) {
                coord.coords[4] = coord.coords[0]
                new MapLabel({
                    text: coord.label,
                    position: new google.maps.LatLng(center.lat(), center.lng()),
                    map: map,
                    fontSize: 11,
                    align: 'center'
                });
            }
            let polygon = new google.maps.Polyline({
                    path: coord.coords,
                    map: map,
                })
                polygon.setOptions(selectedGrids)
                if(coord.isSelected) {
                    changeZoom = true
                    zoomCoord = coord.coords[0]
                    polygon.setOptions(selectedGrids)
                } else {
                    polygon.setOptions(coord.containsDoctors === true ? gridstyleWithDoctors : gridstyle);
                }
                polygons.push(polygon);
                // console.log(google.maps.geometry.spherical.interpolate(start, end, 0.5))
                if(withAllLabels === true) {
                    new MapLabel({
                        text: coord.label,
                        position: new google.maps.LatLng(center.lat(), center.lng()),
                        map: map,
                        fontSize: 11,
                        align: 'center'
                    });
                }
            
            return coord
        })
        if(changeZoom === true) {
            myCenter = new google.maps.LatLng(zoomCoord.lat, zoomCoord.lng)
            map.setCenter(myCenter)
            map.setZoom(10)
        }
    }

    function download(content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }