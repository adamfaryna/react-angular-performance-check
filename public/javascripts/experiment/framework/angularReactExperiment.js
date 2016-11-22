 (function () {
	var name = 'Angular & React';
	var rootElementId = '.angular-react-app';

	var app,
		common,
		ExperimentComponent,
		BasicExperiment;

	var React = window.React;
	var ReactDOM = window.ReactDOM;
	var angular = window.angular;

	if (typeof require === 'undefined') {
		app = window.app;
		common = window.app.common;
		ExperimentComponent = window.app.react.ExperimentComponent;
		BasicExperiment = window.app.experiment.BasicExperiment;

	} else {
		app = require('../../app');
		common = require('../../commons');
		ExperimentComponent = require('../../react/experimentComponent');
		BasicExperiment = require('../BasicExperiment');
	}

	var rootElement = common.getExperimentRootElement(rootElementId);
	var collectionRootElement = common.getCollectionRootElement(rootElementId);
	var testTimeElement = common.getTestTimeElement(rootElementId);
	var testElementsCountElement = common.getTestElementsCountElement(rootElementId);
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
						testElementsCountElement.innerHTML = common.getTestElementsCount(rootElementId);

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
						testElementsCountElement.innerHTML = common.getTestElementsCount(rootElementId);

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

	AngularReactExperiment.prototype = new BasicExperiment();
	var angularReactExperiment = new AngularReactExperiment();

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = angularReactExperiment;

	} else if (window.app) {
		window.app.experiment.framework.angularReact = angularReactExperiment;
		
	} else {
		throw new Error('No application context nor modules found!');
	}
})();
