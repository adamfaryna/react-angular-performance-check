(function () {
	var Record = function() {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'partials/record.directive.pug',
			link: function (scope) {
				scope.data = {};
			}
		};
	};

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = Record;

	} else if (window.app) {
		window.app.angular.Record = Record;
	
	} else {
		throw new Error('No application context nor modules found!');
	}
})();
