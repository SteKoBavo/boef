Boef = (function() {
    var emitters = [];
    var sensors = [];
	var rijen = [];
 
    return {
        plaatsEmitter: function(latitude, longitude) {
            emitters.push({ latitude:latitude, longitude:longitude })
        },
        emitters: function() {
            return emitters;
        },
        plaatsSensor: function(latitude, longitude) {
            sensors.push({
				latitude:latitude,
				longitude:longitude,
				pulses: [],
				afstand: function() {
					var phi1 = latitude/180.0*Math.PI;
					var phi2 = emitters[0].latitude/180.0*Math.PI;
					var lambda1 = longitude/180.0*Math.PI;
					var lambda2 = emitters[0].longitude/180.0*Math.PI;
					var rAarde = 6371000;
					/* Gebruikt de Haversine formule */
					var h = Math.pow(Math.sin(0.5*(phi2-phi1)),2) + Math.cos(phi1)*Math.cos(phi2)*Math.pow(Math.sin(0.5*(lambda2-lambda1)),2);
					return 2*rAarde*Math.asin(Math.sqrt(h));
				},
				pulse: function(tijd) {
					this.pulses.push(tijd);
				},
				aantalMeterGrondstof: function() {
					var snelheidGrondstof = 1493.0;
					var snelheidNormaal = 4176.0;
					return (this.pulses[0]-this.afstand()/snelheidNormaal)/(1.0/snelheidGrondstof - 1.0/snelheidNormaal);
				}
			})
        },
        sensors: function() {
            return sensors;
        },
		plaatsSensoren: function(latitude, longitude, number) {
			var rij = [];
			var latitudeEmitter = emitters[0].latitude;
			var longitudeEmitter = emitters[0].longitude;
			for (var i=1; i<=number; i++) {
				latitudei = latitudeEmitter + i*(latitude-latitudeEmitter);
				longitudei = longitudeEmitter + i*(longitude-longitudeEmitter);
				this.plaatsSensor(latitudei,longitudei);
				rij.push(sensors[sensors.length-1]);
			}
			rijen.push(rij);
		},
		rijen: function() {
			return rijen;
		},
		reset: function() {
			emitters = [];
			sensors = [];
			rijen = [];
		}
    };
})();