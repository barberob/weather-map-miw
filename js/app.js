// On créé une carte OpenStreetMap avec la librairie Leaflet

let map = L.map('maCarte').setView([44.55962000171788, 6.079823238576286], 12);

// On lui applique un style de tuiles

L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
//Il est toujours bien de laisser le lien vers la source des données

attribution: 'données <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap </a> <span> & </span> <a href="https://www.openstreetmap.fr/"> OSM France </a>',
minZoom: 1,
maxZoom: 20,
}).addTo(map)



map.on('moveend', function() { 
    console.log(map.getBounds());
});

ajax('connect.php', (res) => {
	console.log(JSON.parse(res.response));
})