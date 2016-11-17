app.angular.Record = (function () {
	return function() {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'partials/record.directive.pug',
			link: function (scope) {
				scope.data = {};
			}
		};
	};
})();
