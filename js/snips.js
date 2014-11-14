$.getJSON('data/ecozone_wgs84_multipart.geojson', function(data){
	console.log(data);
	var zoneList = for (var i=0; i< data.features.length; i++) {
		console.log(data.features[i].properties.MAJORCOLOR)
	};
})


//this code works when testing with window to bring objects out of a function
for (var i=0; i< data.features.length; i++) {
	console.log(test.features[i].properties.MAJORCOLOR)
};
