
let average = {} // moyennes

const td_temp     = __('.js-temp')
const td_humidity = __('.js-humidity')
const td_pressure = __('.js-pressure')


const getAvg = arr => {
	if (arr.length > 0) return (arr.reduce((a, b) => a + b) / arr.length).toFixed(2)
	else return null
}

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
	average.temperature = []
	average.humidity    = []
	average.pressure    = []
	for(let el of data) {
		const [lng, lat] = el.place.location
		const marker = L.marker([lat, lng])
		marker.bindPopup(createPopupText(el))
		this.markers.addLayer(marker)
	}

	displayAverageValues()
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
				let data_type = measure[1].type[i]
				let value = Object.values(measure[1].res)[0][i]

				if(data_type === 'temperature') {
					str += `Température : ${value} °c <br>`
				} else if (data_type === 'humidity') {
					str += `Humidité : ${value} % <br>`
				} else {
					str += `Pression : ${value} mbar <br>`
				}
				average[data_type].push(value)
			}
		}
	})
	return str
}

const displayAverageValues = () => {
	average.temperature = getAvg(average.temperature)
	average.humidity    = getAvg(average.humidity)
	average.pressure    = getAvg(average.pressure)

	if (average.temperature && average.humidity && average.pressure) {
		td_temp.textContent     = `${average.temperature} °c`
		td_humidity.textContent = `${average.humidity} %`
		td_pressure.textContent = `${average.pressure} mbar`
	} else {
		let str = 'Pas de données'
		td_temp.textContent     = str
		td_humidity.textContent = str
		td_pressure.textContent = str
	}
}




// On créé une carte OpenStreetMap avec la librairie Leaflet
let map = L.map('maCarte')
map.setView([44.55962000171788, 6.079823238576286], 12);

// On lui applique un style de tuiles
L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
	minZoom: 1,
	maxZoom: 20,
}).addTo(map)


// limite au bord de la carte
map.setMaxBounds(
	L.latLngBounds(
		L.latLng(-89.98155760646617, -179),
		L.latLng(89.99346179538875, 179)
	)
);

map.on("drag", () => {
	map.panInsideBounds(
		L.latLngBounds(
		L.latLng(-89.98155760646617, -179),
		L.latLng(89.99346179538875, 179)
		),
		{ animate: false }
	);
});


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
	if(__('#adresse').value === '') return
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

__('form').addEventListener('submit', e => {
	e.preventDefault()

	if(__('#adresse').value == '') return

	const query = __('#adresse').value.split(' ').join('+')
	fetch(`https://api-adresse.data.gouv.fr/search/?q=${query}`)
	.catch(req => console.log('error', req))
	.then(req => req.json())
	.then(res => {
		if (__('label')) __('label').remove()
		if(res.features.length === 0 || res.features[0].properties.score < 0.5) {
			__('.input_container').prepend(createEl('label', {for : 'adresse'}, 'Veuillez entrer une adresse plus précise'))
			return
		}
		const [lng, lat] = res.features[0].geometry.coordinates
		map.setView([lat, lng])
		fetchMarkers()
	})
	.catch(res => console.log(res))
})