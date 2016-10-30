app.angular.OnFinish = function() {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			if (scope.$last) {
				scope.$emit(attr.onFinish, Date.now());
			}
		}
	}
}
