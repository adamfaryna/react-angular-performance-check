var template = require('../../views/partials/record.directive.template.pug');


module.exports = function () {
	return {
		restrict: 'E',
		replace: true,
		template: template,
		link: function (scope) {
			scope.data = {};
		}
	};
};
