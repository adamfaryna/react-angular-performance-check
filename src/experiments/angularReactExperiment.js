app.experiments.angularReact = (function () {
	var name = 'Angular & React';
	var rootElementId = 'angularReactApp';
	var common = app.common;
	var ExperimentComponent = app.react.ExperimentComponent;
	var rootElement = document.getElementById('angularReactApp');
	var collectionRootElement = common.getCollectionRootElement(rootElementId);
	var testTimeElement = common.getTestTimeElement(rootElementId);
	var cleanListener = rootElementId + 'clean';
	var runCreateListener = rootElementId + 'runCreate';
	var runAppendListener = rootElementId + 'runAppend';
	var resultListener = rootElementId + 'result';
		
	function AngularReactExperiment() {
		var self = this;
		var scope;
		this.name = name;

		this.runCreate = function (saveRaport) {
			return function () {
				saveRaport = saveRaport !== undefined ? saveRaport : true;

				return new Promise(function (resolve) {
					var eventHandler = function (e) {
						rootElement.removeEventListener(runCreateListener, eventHandler);
						e.preventDefault();

						var testTime = e.detail.testTime;
						testTimeElement.innerHTML = common.formatTestTime(testTime);

						if (saveRaport) {
							self.raports.createOperations.push(testTime);
						}

						resolve();
					};

					rootElement.addEventListener(runCreateListener, eventHandler);
					scope.$emit('runCreate');
				});
			};
		};

		this.runAppend = function (saveRaport) {
			return function () {
				saveRaport = saveRaport !== undefined ? saveRaport : true;

				return new Promise(function (resolve) {
					var eventHandler = function (e) {
						rootElement.removeEventListener(runAppendListener, eventHandler);
						e.preventDefault();

						var testTime = e.detail.testTime;
						testTimeElement.innerHTML = common.formatTestTime(testTime);

						if (saveRaport) {
							self.raports.appendOperations.push(testTime);
						}

						resolve();
					};

					rootElement.addEventListener(runAppendListener, eventHandler);
					scope.$emit('runAppend');
				});
			};
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

			$scope.$watchCollection('data.records', function (records) {
				var eventHandler = function(e) {
					rootElement.removeEventListener(rootElementId, eventHandler);
					e.preventDefault();		
					rootElement.dispatchEvent(new CustomEvent(resultListener, e));
				};

				rootElement.addEventListener(rootElementId, eventHandler);

				var component = React.createElement(ExperimentComponent, {data: records || [], rootId: rootElementId, eventName: rootElementId});
				ReactDOM.render(component, collectionRootElement);
			});

			$scope.$on('$destroy', function () {
			  ReactDOM.unmountComponentAtNode(collectionRootElement);
			});

			$scope.$on('runCreate', function () {
				vm.runCreate();
			});

			$scope.$on('runAppend', function () {
				vm.runAppend();
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

			vm.runCreate = function () {
				return vm.clean()
					.then(function () {
						var eventHandler = function (e) {
							rootElement.removeEventListener(resultListener, eventHandler);
							e.preventDefault();
							rootElement.dispatchEvent(new CustomEvent(runCreateListener, e));
						};

						rootElement.addEventListener(resultListener, eventHandler);

						$timeout(function () {
							$scope.data.startTime = Date.now();
							$scope.data.records = app.getData();
						});
					});
			};

			vm.runAppend = function () {
				return new Promise(function (resolve) {
					var eventHandler = function (e) {
						rootElement.removeEventListener(runCreateListener, eventHandler);
						e.preventDefault();

						$timeout(function () {
							var dataSet = $scope.data.records.concat(app.genDataSet());

							var resultEventHandler = function (e) {
								rootElement.removeEventListener(resultListener, resultEventHandler);
								e.preventDefault();
								rootElement.dispatchEvent(new CustomEvent(runAppendListener, e));
							};

							rootElement.addEventListener(resultListener, resultEventHandler);

							$scope.data.startTime = Date.now();
							$scope.data.records = dataSet;
						});
					};

					rootElement.addEventListener(runCreateListener, eventHandler);
					vm.runCreate();
				});
			};
		}

		angular.bootstrap(rootElement, ['angularReactApp']);
	}

	AngularReactExperiment.prototype = new app.BasicExperiment();
	return new AngularReactExperiment();
})();
