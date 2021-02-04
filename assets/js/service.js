function fetchDoctors() {
 return fetch('https://portal.hudsonpharma.com/HudsonService.svc/GetKarachiDoctorsWithLongLat')
 .then(response => response.json())
 .then(response => {
   let doctors = JSON.parse(response.d)
   doctors = doctors
   .filter(doctor => doctor.Latitude !== null && doctor.Longitude !== null)
   .filter((thing, index, self) =>
     index === self.findIndex((t) => (
       t.Latitude === thing.Latitude && t.Longitude === thing.Longitude
       )))

   return JSON.stringify(doctors);
 })
}