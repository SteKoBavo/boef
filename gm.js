GM = (function() {
	var map;
	var markers = [];
	return {
		addMarker: function(latitude,longitude) {
			var marker = new google.maps.Marker({
				position: {lat: latitude, lng: longitude},
				map: map
			});
			markers.push(marker);
		},
		sensorToMarker: function(sensor) {
			this.addMarker(sensor.latitude,sensor.longitude);
		},
		sensorsToMarkers: function(sensors) {
			for (var i=0; i<sensors.length; i++) {
				this.sensorToMarker(sensors[i]);
			}
		},
		initMap: function() {
			map = new google.maps.Map(document.getElementById('map'), {
				center: {lat: 52.102403, lng: 5.175269},
				zoom: 15
			});
			
			Boef.plaatsEmitter(52.102346, 5.175269);
			Boef.plaatsSensoren(52.101448,5.175354, 10);
			
			this.sensorsToMarkers(Boef.emitters());
			this.sensorsToMarkers(Boef.sensors());
			
			
			
			/* Probeersels met Google Maps */
			var infowindow = new google.maps.InfoWindow({
				content: document.getElementById('form')
			})
			google.maps.event.addListener(map, 'click', function(event) {
				var marker = new google.maps.Marker({
					position: event.latLng,
					map: map
				});
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map, marker);
				});
			});
			
			/* Data points defined as an array of LatLng objects */
			var heatmapData = [
				new google.maps.LatLng(52.100346, 5.177169),
				{location: new google.maps.LatLng(52.100346, 5.173169), weight: 2},
				new google.maps.LatLng(52.100246, 5.176169)
			];
			var heatmap = new google.maps.visualization.HeatmapLayer({
				data: heatmapData
			});
			heatmap.set('radius', 50);
			heatmap.setMap(map);
		}
	};
})();