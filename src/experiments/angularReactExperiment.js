app.experiments.angularReact = (function () {
	var name = 'Angular.js & React.js';
	var rootElementId = 'angularReactApp';
	var common = app.common;
	var ExperimentComponent = app.react.ExperimentComponent;
	var rootElement = document.getElementById('angularReactApp');
	var collectionRootElement = common.getCollectionRootElement(rootElementId);
	var cleanListener = rootElementId + 'clean';
	var runListener = rootElementId + 'run';
	var resultListener = rootElementId + 'result';
		
	function AngularReactExperiment() {
		var self = this;
		this.name = name;
		var scope;

		this.run = function () {
			return new Promise(function (resolve) {
				var eventHandler = function (e) {
					rootElement.removeEventListener(runListener, eventHandler);
					e.preventDefault();
					resolve();
				};

				rootElement.addEventListener(runListener, eventHandler);
				scope.$emit('run');
			});
		};

		this.clean = function () {
			return new Promise(function (resolve) {
				var eventHandler = function() {
					rootElement.removeEventListener(cleanListener, eventHandler);
					e.preventDefault();
					resolve();
				};

				rootElement.addEventListener(cleanListener, eventHandler);
				scope.$emit('clean');
			});
		};

		angular
			.module('angularReactApp', [])
			.directive('onFinish', app.angular.OnFinish)
			.controller('mainController', MainController);

		MainController.$inject = ['$scope', '$timeout'];
		
		function MainController($scope, $timeout) {
			var vm = this;
			scope = $scope;

			$scope.data = {
				records: [],
				testTime: '',
				startTime: '',
				endTime: ''
			};

			vm.run = function () {
				vm.clean()
					.then(function () {
						var eventHandler = function(e) {
							rootElement.removeEventListener(resultListener, eventHandler);
							e.preventDefault();
							self.raports.push(e.detail.testTime);
							$scope.data.testTime = common.formatTestTime(e.detail.testTime);
							rootElement.dispatchEvent(new CustomEvent(runListener));
						};

						rootElement.addEventListener(resultListener, eventHandler);

						$timeout(function () {
							$scope.data.startTime = Date.now();
							$scope.data.records = app.getData();
						});
					});
			};

			$scope.$watchCollection('data.records', function (records) {
				var eventHandler = function(e) {
					rootElement.removeEventListener(rootElementId, eventHandler);
					e.preventDefault();		
					rootElement.dispatchEvent(new CustomEvent(resultListener, e));
				};

				rootElement.addEventListener(rootElementId, eventHandler);

				var component = React.createElement(ExperimentComponent, {data: records || [], rootId: rootElementId});
				ReactDOM.render(component, collectionRootElement);
			});

			$scope.$on('$destroy', function () {
			  ReactDOM.unmountComponentAtNode(collectionRootElement);
			});

			$scope.$on('run', function () {
				vm.run();
			});

			$scope.$on('clean', function () {
				vm.clean();
			});

			vm.clean = function () {
				return new Promise(function (resolve) {
					$timeout(function () {
						$scope.data.startTime = '';
						$scope.data.endTime = '';
						$scope.data.testTime = '';
						$scope.data.records = [];
						resolve();
					});
				});
			};
		}

		angular.bootstrap(rootElement, ['angularReactApp']);
	}

	AngularReactExperiment.prototype = new app.BasicExperiment();
	return new AngularReactExperiment();
})();
