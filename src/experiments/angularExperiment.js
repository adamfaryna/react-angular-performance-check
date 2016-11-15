app.experiments.angular = (function () {
	var name = 'Angular';
	var rootElementId = 'angularApp';
	var common = app.common;
	var rootElement = document.getElementById(rootElementId);
	var contentElement = rootElement.querySelector('.content');
	var testTimeElement = common.getTestTimeElement(rootElementId);
	var cleanListener = rootElementId + 'clean';
	var runCreateListener = rootElementId + 'runCreate';
	var runAppendListener = rootElementId + 'runAppend';

	function AngularExperiment() {
		var self = this;
		var scope;
		this.name = name;

		angular
			.module('angularApp', [])
			.directive('onFinish', app.angular.OnFinish)
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
				saveRaport = saveRaport || true;

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

			$scope.$on('finished', function (e, endTime) {
				var testTime = common.calculateTestTime(vm.data.startTime, endTime);

				if (vm.data.records.length > app.getData().length) {
					rootElement.dispatchEvent(new CustomEvent(runAppendListener, {detail: {testTime: testTime}}));

				} else {
					rootElement.dispatchEvent(new CustomEvent(runCreateListener, {detail: {testTime: testTime}}));
				}
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
						vm.data.startTime = null;
						vm.data.endTime = null;
						vm.data.testTime = '';
						vm.data.records = [];
						rootElement.dispatchEvent(new CustomEvent(cleanListener));
						resolve();
					});
				});
			};

			vm.runCreate = function () {
				return vm.clean()
					.then(function () {
						return new Promise(function (resolve) {
							$timeout(function () {
								vm.data.startTime = Date.now();
							  vm.data.records = app.getData();
							  resolve();
							});
						});
				});
			};

			vm.runAppend = function () {
				return new Promise(function (resolve) {
					var eventHandler = function (e) {
						rootElement.removeEventListener(runCreateListener, eventHandler);
						e.preventDefault();

						$timeout(function () {
							var dataSet = vm.data.records.concat(app.genDataSet());
							vm.data.startTime = Date.now();
						  vm.data.records = dataSet;
						  resolve();
						});
					};

					rootElement.addEventListener(runCreateListener, eventHandler);
					vm.runCreate();
				});
			};
		}

		angular.bootstrap(rootElement, ['angularApp']);
	}	

	AngularExperiment.prototype = new app.BasicExperiment();
	return new AngularExperiment();
})();
