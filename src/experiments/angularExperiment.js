app.experiments.angular = (function () {
	var name = 'Angular';
	var rootElementId = 'angularApp';
	var common = app.common;
	var rootElement = document.getElementById(rootElementId);
	var contentElement = rootElement.querySelector('.content');
	var cleanListener = rootElementId + 'clean';
	var runListener = rootElementId + 'run';
	var testTime;
	var startTime;
	var endTime;


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
		
		this.run = function () {
			return new Promise(function (resolve) {
				var eventHandler = function (e) {
					rootElement.removeEventListener(runListener, eventHandler);
					e.preventDefault();
					self.raports.push(e.detail.testTime);
					resolve();
				};

				rootElement.addEventListener(runListener, eventHandler);
				scope.$emit('run');
			});
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

			vm.run = function () {
				vm.clean()
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

			$scope.$on('finished', function (e, endTime) {
				if (vm.data.records.length !== 0) {
					var testTime = common.calculateTestTime(vm.data.startTime, endTime);
					vm.data.testTime = common.formatTestTime(testTime);
					rootElement.dispatchEvent(new CustomEvent(runListener, {detail: {testTime: testTime}}));
				}
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
						vm.data.startTime = null;
						vm.data.endTime = null;
						vm.data.testTime = '';
						vm.data.records = [];
						rootElement.dispatchEvent(new CustomEvent(cleanListener));
						resolve();
					});
				});
			};
		}

		angular.bootstrap(rootElement, ['angularApp']);
	}	

	AngularExperiment.prototype = new app.BasicExperiment();
	return new AngularExperiment();
})();
