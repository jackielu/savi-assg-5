
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
		+ feature.properties.MINOR_NUM
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

//add your data to the map
$.getJSON('data/ecozone_wgs84_multipart.geojson', function(data){
	//console.log(data);
	var geojsonLayer = L.geoJson(data.features, {  //use leaflet's functionality to grab geoJSON features
		onEachFeature: makeMarkers,
		//this provides thematic styling to the layers
		style: function(feature) {
			switch (feature.properties.MAJORCOLOR) {
				case 'ZONE A': return {color:"#a6cee3"};
				case 'ZONE B': return {color:"#1f78b4"};
				case 'ZONE C': return {color:"#b2df8a"};
				case 'ZONE D': return {color:"#33a02c"};
				case 'ZONE E': return {color:"#fb9a99"};
				case 'ZONE F': return {color:"#e31a1c"};
				case 'ZONE G': return {color:"#fdbf6f"};
				case 'ZONE H': return {color:"#ff7f00"};
				case 'ZONE I': return {color:"#cab2d6"};
				case 'ZONE J': return {color:"#6a3d9a"};
				case 'ZONE K': return {color:"#ffff99"};
				case 'ZONE L': return {color:"#b15928"};
			}
		}, weight:1.25, opacity: 0.95, fillOpacity: 0.5
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


//listeners for the About pop-up window
$('#about').on('click',function(){
	$('#mask').fadeIn(250);
	$('.popup').fadeIn(250);
});

$('.close').on('click',function(){
	$(this).parent().fadeOut(250);
	$('#mask').fadeOut(250);
});

