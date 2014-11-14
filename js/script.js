
//set up our map
var map = L.map('map')
	.setView([42.7559421,-75.8092041], 7);


//set up basemap tiles from stamen
L.tileLayer('http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20
}).addTo(map);


//function to create pop-ups and sidebar divs
function makeMarkers(feature, layer){
	//console.log(feature);
	//layer.bindPopup defines the pop-up value
	//layer.bindPopup(
	//	"Ecozone: <br>"
	//	+ feature.properties.MINOR_DESC
	//	);
	//layer.bindLabel defines the label text
	layer.bindLabel(
		feature.properties.MINOR
		);
	//set up divs classed using the MINOR_DESC 
	$('#sideBar').append(
		"<div class = 'sideBarItem' id='"
		+ feature.properties.MAJORCOLOR
		+"'>"
		+ feature.properties.MINOR_DESC
		+"</div>"
		)
	}


function highlightMarker(geojsonLayer,thisPoly) {
  geojsonLayer.eachLayer(function(marker) {
		if(thisPoly==marker.feature.properties.MINOR_NUM) {
   		marker.setStyle({
   			fillOpacity: 0.95,
   			weight:3
   			});
   			//console.log(marker.options.fillOpacity);
		} else {
			marker.setStyle({
				fillOpacity:.5,
				weight:1.25
				});
		}
  });
}


//get color depending on the Zone value
function getColor(z) {
	return 	z == 'ZONE A' ? '#a6cee3':
			z == 'ZONE B' ? '#1f78b4':
			z == 'ZONE C' ? '#b2df8a':
			z == 'ZONE D' ? '#33a02c':
			z == 'ZONE E' ? '#fb9a99':
			z == 'ZONE F' ? '#e31a1c':
			z == 'ZONE G' ? '#fdbf6f':
			z == 'ZONE H' ? '#ff7f00':
			z == 'ZONE I' ? '#cab2d6':
			z == 'ZONE J' ? '#6a3d9a':
			z == 'ZONE K' ? '#ffff99':
			z == 'ZONE L' ? '#b15928':
			'#000000';
	}

function style(feature) {
	return {
		fillColor: getColor(feature.properties.MAJORCOLOR),
		color: getColor(feature.properties.MAJORCOLOR),
		weight: 1.25,
		opacity: 0.95,
		fillOpacity: 0.5
	};
}



//add your data to the map
$.getJSON('data/ecozone_wgs84_multipart.geojson', function(data){
	//window.test = data;  //only use window for testing
	//console.log(data);
	var geojsonLayer = L.geoJson(data.features, {  //use leaflet's functionality to grab geoJSON features
		onEachFeature: makeMarkers,
		//this provides thematic styling to the layers
		style: style
	})
	.addTo(map);  //add to map

	$('.sideBarItem')
	.mouseenter(function(){
		$(this).toggleClass('highlight');
		var thisPoly = $(this).attr('id');
		highlightMarker(geojsonLayer,thisPoly);
	})
	.mouseout(function(){
		$(this).toggleClass('highlight');
	})
});


//ADDING A LEGEND TO THE MAP
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
	//use DomUtil to create divs with classes info legend
	var div = L.DomUtil.create('div', 'info legend')
	//create labels
}


//listeners for the About pop-up window
$('#about').on('click',function(){
	$('#mask').fadeIn(250);
	$('.popup').fadeIn(250);
});

$('.close').on('click',function(){
	$(this).parent().fadeOut(250);
	$('#mask').fadeOut(250);
});

