// services

app.factory('vehicleService', function($q, $http) {
	return {
		saveVehicle: function(vehicle) {
			var def = $q.defer();
			var config = {
				method: 'POST',
				url: service_url + '/vehicles',
				headers: {
					'Content-Type' : 'application/json'
				},
				data: vehicle
			}
			$http(config).then(function(payload) {
				def.resolve(payload.data);
			});
			return def.promise;
		},
		getVehicles: function() {
            var deferred = $q.defer();
            var config = {
	            method: 'GET',
	            url: service_url + '/vehicles'
            }
            $http(config).then(function(payload) {
            		deferred.resolve(payload);
            	}
            );
            return deferred.promise;			
		}					
	}
});