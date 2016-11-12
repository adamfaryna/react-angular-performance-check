app.experiments.angular = (function () {
	var name = 'Angular.js';
	var rootElementId = 'angularApp';
	var common = app.common;
	var rootElement = document.getElementById(rootElementId);
	var cleanListener = rootElementId + 'clean';
	var runListener = rootElementId + 'run';


	function AngularExperiment() {
		var self = this;
		var scope;
		this.name = name;

		angular
			.module('angularApp', [])
			.directive('onFinish', app.angular.OnFinish)
			.controller('mainController', MainController);

		MainController.$inject = ['$scope', '$timeout'];
		
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
				startTime: '',
				endTime: ''
			};

			vm.run = function () {
				vm.clean()
					.then(function () {
						$timeout(function () {
							vm.data.startTime = Date.now();
						  vm.data.records = app.getData();
						});
				});
			};

			$scope.$on('finished', function (e, endTime) {
				var testTime = common.calculateTestTime(vm.data.startTime, endTime);
				self.raports.push(testTime);
				vm.data.testTime = common.formatTestTime(testTime);
				rootElement.dispatchEvent(new CustomEvent(runListener, {detail: {testTime: testTime}}));
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
						vm.data.startTime = '';
						vm.data.endTime = '';
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
