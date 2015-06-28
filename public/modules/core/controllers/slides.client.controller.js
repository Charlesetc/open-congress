'use strict';

var times = 0;

function shuffle(o) {
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}


// Random Jquery function
angular.module('core').controller('SlidesController', ['$scope', '$document', '$http', 'Authentication',
	function($scope, $document, $http, Authentication) {
		$scope.authentication = Authentication;

		$scope.question = 'Are you ready to play?';

		user = $scope.authentication.user;

		console.log(user);

		var address = user.address + " " + user.city + ", " + user.state + " " + user.zip;

		$scope.choices = ['Yes', 'No'];
    $scope.pics = []
		$scope.other_choices = $scope.choices.slice(0);

		$scope.checkCorrect = function() {
			if ('0' === $scope.choice) {
				times++;

				$http.get('/congress/getBasicQuestion/' + address)
				.success(function (data,status,headers,config) {
					console.log(JSON.stringify(data));
					shuffle($scope.choices);

          $scope.question = data.question_name;
					$scope.choices = data.choice_list.slice(0,5);
          $scope.pics = _.map(data.options, (function (item) { return (item.image); })).slice(0,5);
          if (data.question === 'Which congressman is this?') {
            $scope.pics = $scope.pics.slice(0,1)
          }
					$scope.other_choices = $scope.choices.slice(0);

					shuffle($scope.choices);
				})
				.error(function (data,status,headers,config) {
					console.log("ERROR");
					console.log(JSON.stringify(data));
				});


				alert("Well Done");
			} else {
				// Not the right answer...
			}
		}
	}
]);
