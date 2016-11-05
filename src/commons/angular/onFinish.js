app.angular.OnFinish = (function () {
	return function Directive() {
		return {
			restrict: 'A',
			link: function (scope, element, attr) {
				var onFinish = attr.onFinish || 'finished';

				if (scope.$last) {
					scope.$emit(onFinish, Date.now());
				}
			}
		}
	};
})();
