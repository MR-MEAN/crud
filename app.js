var app = angular.module('myapp', []);

app.controller('mainController', function($scope, $http){
	
	$scope.message = "Hello World";
	$scope.firstname = {};
	$scope.lastname = {};
	
	$http.get('/persons')
		.success(function(data){
			$scope.firstname = {};
			$scope.lastname = {};
			$scope.persons = data;
		});
	
	$scope.insertname = function() {
		$http.post('/persons', {'firstname': $scope.firstname, 'lastname': $scope.lastname})
			.success(function(data){
				$scope.firstname = {};
				$scope.lastname = {};
				$scope.persons = data;
			});
	};
	
	$scope.selectid = function(person){
		$scope.firstname.text = person.firstname;
		$scope.lastname.text = person.lastname;
		return $scope.selectedid = person._id;
	};
	
	$scope.deletename = function(selectid) {
		$http.delete('/persons/' + $scope.selectedid)
			.success(function(data){
				$scope.firstname = {};
				$scope.lastname = {};
				$scope.persons = data;
			})
			.error(function(data){
				console.log("Error: " + data);
			});
	};
	
	$scope.updatename = function(selectid) {
		$http.put('/persons', {'_id': $scope.selectedid, 'firstname': $scope.firstname, 'lastname': $scope.lastname})
			.success(function(data){
				$scope.firstname = {};
				$scope.lastname = {};
				$scope.persons = data;
			})
			.error(function(data){
				console.log("Error: " + data);
			});
	};
	
});