/**
 * récupère les stations netatmo dans la zone de la carte
 * puis appelle updateMap()
 */
const fetchMarkers = () => {
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
}

/**
 * @param {Object} data
 */
const updateMap = (data) => {
	
	this.markers.clearLayers()
	
	for(let el of data) {
		const [lng, lat] = el.place.location
		const marker = L.marker([lat, lng])
		marker.bindPopup(createPopupText(el))
		this.markers.addLayer(marker)
	}
	map.addLayer(this.markers)
}


/**
 * 
 * @param {Object} station : netatmo station data
 */
const createPopupText = (station) => {

	let str = '';

	[...Object.entries(station.measures)].forEach(measure => {
		if (measure[1].type) {
			for (let i = 0; i < measure[1].type.length; i++) {
				const data_type = measure[1].type[i]
				
				if(data_type === 'temperature') {
					str += `Température : ${Object.values(measure[1].res)[0][i]} °c <br>`
				} else if (data_type === 'humidity') {
					str += `Humidité : ${Object.values(measure[1].res)[0][i]} % <br>`
				} else {
					str += `Pression : ${Object.values(measure[1].res)[0][i]} mbar <br>`
				}
			}
		}
	})
	return str
}




// On créé une carte OpenStreetMap avec la librairie Leaflet
let map = L.map('maCarte')
map.setView([44.55962000171788, 6.079823238576286], 12);

// On lui applique un style de tuiles
L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
	minZoom: 1,
	maxZoom: 20,
}).addTo(map)



this.markers = L.markerClusterGroup()
fetchMarkers()

// écoute les déplacements de l'utilisateur
map.on('moveend', () => {
	fetchMarkers()
})


// autocomplete

let datalist = __('#adresses');

function req()
{
	if(__('#adresse').value == '') return
  // Création d'une instance de la classe XMLHttpRequest

  let req = Xhr();

  req.onreadystatechange = function()
  {
    if(this.readyState==this.DONE)
    {
      let reponse = JSON.parse(this.responseText);

	  autocomplete(reponse)
	}
  };

  // Récupération des infos de la ville en mode asynchrone

  req.open("GET", "https://api-adresse.data.gouv.fr/search/?q="+__('#adresse').value, true); // true pour asynchrone

  req.send(null);
}

// Actualisation de la requête à chaque caractère tapé dans la saisie (autocomplétion)
__('input#adresse').addEventListener("input", function(e){req();}, false);



const autocomplete = (reponse) => {
	datalist.innerHTML = "";

	for(let i=0; i<reponse.features.length; i++)
	{
		createEl("option", {value:reponse.features[i].properties.label}, "", datalist);
	}

	__('#adresse').setAttribute('list', '');
	__('#adresse').setAttribute('list', 'adresses');
}


__('button').addEventListener('click', () => {
	if(__('#adresse').value == '') return
	const query = __('#adresse').value.split(' ').join('+')
	console.log(query)
	fetch(`https://api-adresse.data.gouv.fr/search/?q=${query}`)
	.catch(req => console.log('error', req))
	.then(req => req.json())
	.then(res => {
		console.log(res.features[0].geometry.coordinates)
		const [lng, lat] = res.features[0].geometry.coordinates
		map.setView([lat, lng])
		fetchMarkers()
	})
})