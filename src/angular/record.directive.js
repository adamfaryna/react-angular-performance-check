app.angular.Record = (function () {
	return function() {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'angular/record.directive.html',
			link: function (scope) {
				scope.data = {};
			}
		};
	};
})();
