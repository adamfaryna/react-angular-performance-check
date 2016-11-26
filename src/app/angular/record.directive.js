module.exports = function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: require('ng-cache!html!pug!../../views/partials/record.directive.pug'),
		link: function (scope) {
			scope.data = {};
		}
	};
};
