(function () {
	angular
		.module('angularApp', [])
		.directive('onFinish', app.angular.OnFinish)
		.controller('mainController', MainController);

	MainController.$inject = ['$scope', '$timeout'];

	function MainController($scope, $timeout) {
		var vm = this;

		vm.data = {
			records: [],
			testTime: '',
			startTime: '',
			endTime: ''
		};

		vm.runTest = function () {
			vm.cleanTest();

			$timeout(function () {
				vm.data.startTime = Date.now();
				vm.data.records = app.getData();
			}, 1000);
		};

		$scope.$on('finished!', function (e, endTime) {
			vm.data.testTime = app.common.formatTestTime(vm.data.startTime, endTime);
		});

		vm.cleanTest = function () {
			vm.data.startTime = '';
			vm.data.endTime = '';
			vm.data.testTime = '';
			vm.data.records = [];
		}
	}

	var angularRoot = document.getElementById('angularApp');
	angular.bootstrap(angularRoot, ['angularApp']);
})();
