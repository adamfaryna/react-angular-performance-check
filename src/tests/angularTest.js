app.tests.angular = (function () {
	var name = 'Angular.js';
	var rootElementId = 'angularApp';
	var common = app.common;
	var rootElement = document.getElementById(rootElementId);

	function AngularTest() {
		var self = this;
		
		this.name = name;
		this.run = function (callback) {
			scope.$emit('run');
			scope.$on('done', function () {
				if (callback) {
					callback();
				}
			});
		};

		angular
			.module('angularApp', [])
			.directive('onFinish', app.angular.OnFinish)
			.controller('mainController', MainController);

		MainController.$inject = ['$scope', '$timeout'];
		var scope;

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
				return new Promise(function (resolve) {
					vm.clean();

					$timeout(function () {
						var eventHandler = function(e) {
							rootElement.removeEventListener(rootElementId, eventHandler);		
							self.raports.push() = app.getData();
							resolve();
						};

						vm.data.startTime = Date.now();
					  vm.data.records = app.getData();
						rootElement.addEventListener(rootElementId, eventHandler);
					}, 50);
				});
			};

			$scope.$on('finished', function (e, endTime) {
				var testTime = common.calculateTestTime(vm.data.startTime, endTime);
				self.raports.push(testTime);
				vm.data.testTime = common.formatTestTime(testTime);
				var event = new CustomEvent(rootElement, {detail: {testTime: testTime}});
				rootElement.dispatchEvent(event);
			});

			$scope.$on('run', function (e) {
				vm.run();
			});

			vm.clean = function () {
				clean();
				vm.data.startTime = '';
				vm.data.endTime = '';
				vm.data.testTime = '';
				vm.data.records = [];
			}
		}

		function clean() {
			AngularTest.prototype.clean.call(self);
		}

		angular.bootstrap(rootElement, ['angularApp']);
	}	

	AngularTest.prototype = new app.Basic();
	return new AngularTest();
})();
