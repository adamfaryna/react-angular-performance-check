angular
	.module('angularApp', [])
	.directive('onFinish', OnFinish)
	.controller('mainController', MainController);

MainController.$inject = ['$scope'];

function OnFinish() {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			if (scope.$last) {
				scope.$emit(attr.onFinish, Date.now());
			}
		}
	}
}

function MainController($scope) {
	var vm = this;

	vm.data = {
		records: [],
		testTime: '',
		startTime: '',
		endTime: ''
	};

	vm.runTest = function () {
		vm.cleanTest();
		vm.data.startTime = Date.now();
		vm.data.records = app.getData();
		// var timeEnd = Date.now();
		// vm.testTime = moment(startTime.diff(timeEnd)).format("HH:mm:ss")
		// vm.testTime = timeEnd - startTime;
	};

	$scope.$on('finished!', function (e, endTime) {
		vm.data.testTime = (endTime - vm.data.startTime) + 'ms';
	});

	vm.cleanTest = function () {
		vm.data.startTime = '';
		vm.data.endTime = '';
		vm.data.records = [];
	}
}

var angularRoot = document.getElementById('angularApp');
angular.bootstrap(angularRoot, ['angularApp']);
