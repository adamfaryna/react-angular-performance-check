(function () {
	var rootElementId = 'angularReactApp';
	var TestComponent = app.react.TestComponent;
	var rootElement = document.getElementById('angularReactApp');
	var collectionRootElement = app.common.getCollectionRootElement(rootElementId);
	
	angular
		.module('angularReactApp', [])
		.directive('onFinish', app.angular.OnFinish)
		.controller('mainController', MainController);

	MainController.$inject = ['$scope', '$timeout'];

	function MainController($scope, $timeout) {
		var vm = this;

		$scope.data = {
			records: [],
			testTime: '',
			startTime: '',
			endTime: ''
		};

		vm.runTest = function () {
			vm.cleanTest();

			$timeout(function () {
				$scope.data.startTime = Date.now();
				$scope.data.records = app.getData();
			}, 1000);
		};

		rootElement.addEventListener(rootElementId, function (e) {
			$timeout(function () {
				$scope.data.testTime = e.detail.testTime;	
			});
		});

		$scope.$watchCollection('data.records', function (records) {
			var component = React.createElement(TestComponent, {data: records || [], rootId: rootElementId});
			ReactDOM.render(component, collectionRootElement);
		});

		$scope.$on('$destroy', function () {
		  ReactDOM.unmountComponentAtNode(collectionRootElement);
		});

		vm.cleanTest = function () {
			$scope.data.startTime = '';
			$scope.data.endTime = '';
			$scope.data.testTime = '';
			$scope.data.records = [];
		}
	}

	angular.bootstrap(rootElement, ['angularReactApp']);
})();
