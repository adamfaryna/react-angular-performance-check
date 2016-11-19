app.experiment.framework.angular = (function () {
	var name = 'Angular';
	var rootElementId = '.angular-app';
	var common = app.common;
	var rootElement = common.getExperimentRootElement(rootElementId);
	var contentElement = rootElement.querySelector('.content');
	var testTimeElement = common.getTestTimeElement(rootElementId);
	var testElementsCountElement = common.getTestElementsCountElement(rootElementId);
	var cleanListener = rootElementId + 'clean';
	var runCreateListener = rootElementId + 'runCreate';
	var runCreateHelpListener = rootElementId + 'runCreateHelp';
	var runAppendListener = rootElementId + 'runAppend';

	function AngularExperiment() {
		var self = this;
		var scope;
		this.name = name;
		var isRunning = false;

		angular
			.module('angularApp', [])
			.directive('myRecord', app.angular.Record)
			.controller('mainController', MainController);

		MainController.$inject = ['$scope', '$timeout'];
		
		this.runCreate = function (saveRaport) {
			return function () {
				saveRaport = saveRaport || true;

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

						isRunning = false;
						resolve();
					};

					rootElement.addEventListener(runCreateListener, eventHandler);
					scope.$emit('runCreate');
				});
			};
		};

		this.runAppend = function (saveRaport) {
			return function () {
				saveRaport = saveRaport || true;

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

						isRunning = false;
						resolve();
					};

					rootElement.addEventListener(runAppendListener, eventHandler);
					scope.$emit('runAppend');
				});
			};
		};

		this.clean = function () {
			return new Promise(function (resolve) {
				var eventHandler = function (e) {
					rootElement.removeEventListener(cleanListener, eventHandler);
					e.preventDefault();
					resolve();
				};

				rootElement.addEventListener(cleanListener, eventHandler);
				scope.$emit('clean');
			});
		};

		function MainController($scope, $timeout) {
			var vm = this;
			scope = $scope;

			vm.data = {
				records: [],
				testTime: '',
				startTime: null,
				endTime: null
			};

			$scope.$on('runCreate', function () {
				vm.runCreate(true);
			});

			$scope.$on('runAppend', function () {
				vm.runAppend();
			});

			$scope.$on('clean', function () {
				vm.clean();
			});

			vm.$doCheck = function () {
				// check if child components are fully initiated
				if (isRunning) {
					var recordId = contentElement.querySelector('.record .record-id span');

					if (recordId &&
							contentElement.querySelectorAll('.record').length === vm.data.records.length &&
							recordId.innerText === vm.data.records[0].id.toString()) {
						var endTime = Date.now();
						var testTime = common.calculateTestTime(vm.data.startTime, endTime);

						if (vm.data.records.length > app.getData().length) {
							rootElement.dispatchEvent(new CustomEvent(runAppendListener, {detail: {testTime: testTime}}));

						} else {
							rootElement.dispatchEvent(new CustomEvent(runCreateListener, {detail: {testTime: testTime}}));
						}
					}
				}
			};

			vm.clean = function () {
				return new Promise(function (resolve) {
					$timeout(function () {
						vm.data.startTime = null;
						vm.data.endTime = null;
						vm.data.testTime = '';
						vm.data.records = [];
						rootElement.dispatchEvent(new CustomEvent(cleanListener));
						resolve();
					});
				});
			};

			vm.runCreate = function (runningState) {
				return vm.clean()
					.then(function () {
						return new Promise(function (resolve) {
							$timeout(function () {
								isRunning = runningState;
								vm.data.startTime = Date.now();
							  vm.data.records = app.getData();
							  rootElement.dispatchEvent(new CustomEvent(runCreateHelpListener));
							  resolve();
							});
						});
				});
			};

			vm.runAppend = function () {
				return new Promise(function (resolve) {
					var eventHandler = function (e) {
						rootElement.removeEventListener(runCreateHelpListener, eventHandler);
						e.preventDefault();

						$timeout(function () {
							var dataSet = vm.data.records.concat(app.genDataSet());
							isRunning = true;
							vm.data.startTime = Date.now();
						  vm.data.records = dataSet;
						  resolve();
						});
					};

					rootElement.addEventListener(runCreateHelpListener, eventHandler);
					vm.runCreate(false);
				});
			};
		}

		angular.bootstrap(rootElement, ['angularApp']);
	}	

	AngularExperiment.prototype = new app.experiment.BasicExperiment();
	return new AngularExperiment();
})();
