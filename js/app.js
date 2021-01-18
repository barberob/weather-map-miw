// On créé une carte OpenStreetMap avec la librairie Leaflet

let map = L.map('maCarte')
map.setView([44.55962000171788, 6.079823238576286], 12);
// On lui applique un style de tuiles

L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
//Il est toujours bien de laisser le lien vers la source des données

// attribution: 'données <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap </a> <span> & </span> <a href="https://www.openstreetmap.fr/"> OSM France </a>',
minZoom: 1,
maxZoom: 20,
}).addTo(map)

this.markers = L.layerGroup()

map.on('moveend', () => {
	const bounds = map.getBounds()
	const params = getParams({
		lat_ne : bounds._northEast.lat,
        lon_ne : bounds._northEast.lng,
        lat_sw : bounds._southWest.lat,
        lon_sw : bounds._southWest.lng
	})

	fetch(`connect.php?${params}`)
	.catch(req => console.error(req))
	.then(req => req.json())

	.then(res => updateMap(res))
	.catch(res => console.error(res))
})


const updateMap = (data) => {
	this.markers.clearLayers()
	map.removeLayer(markers)

	for(let el of data) {
		const [lng, lat] = el.place.location
		L.marker([lat, lng]).addTo(this.markers)
	}
	this.markers.addTo(map)
}
