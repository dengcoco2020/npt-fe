var app = angular.module("vehiclePage", []);

var service_url = 'http://13.251.255.191/index.php';

app.directive('capitalize', function() {
	return {
    	require: 'ngModel',
		link: function(scope, element, attrs, modelCtrl) {
        	var capitalize = function(inputValue) {
				if (inputValue == undefined) inputValue = '';
				var capitalized = inputValue.toUpperCase();
				if (capitalized !== inputValue) {
					var selection = element[0].selectionStart;
					modelCtrl.$setViewValue(capitalized);
					modelCtrl.$render();
					element[0].selectionStart = selection;
					element[0].selectionEnd = selection;
          		}
		  		return capitalized;
        	}
			modelCtrl.$parsers.push(capitalize);
			capitalize(scope[attrs.ngModel]); // capitalize initial value
		}
    };
});

app.controller("vehicleController", function($scope, $http, vehicleService) {

	$scope.vehicles = [];
	$scope.vehicle = {};
	$scope.load = true;

	this.$onInit = function() {
		$scope.getVehicles();
	}

	$scope.saveVehicle = function(vehicle) {
		$scope.load = true;
		vehicleService.saveVehicle(vehicle)
			.then(function(payload) {
				console.log(payload);
			})
			.then(function() {
				$scope.getVehicles();
			})
			.then(function() {
				$scope.load = false;
			});
	}

	$scope.getVehicles = function() {
		vehicleService.getVehicles()
			.then(function(payload) {
				$scope.vehicles = payload.data.vehicles;
			})
			.then(function() {
				$scope.load = false;
			})
	}
	
});
