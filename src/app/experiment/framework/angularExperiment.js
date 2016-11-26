var name = 'Angular';
var rootElementId = '.angular-app';

var angular = require('angular')
var basic = require('../../basic');
var	common = require('../../commons');
var	Record = require('../../angular/record.directive');
var	TestTimePair = require('../../model/testTimePair');
var	BasicExperiment = require('../basicExperiment');
	
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
	this.rootElementId = rootElementId;
	var isRunning = false;

	angular
		.module('angularApp', [])
		.directive('myRecord', Record)
		.controller('mainController', MainController)
		.config(function($sceProvider) { $sceProvider.enabled(false); });

	MainController.$inject = ['$scope', '$timeout'];
	
	this.runCreate = function runCreate(saveRaport) {
		return function () {
			saveRaport = saveRaport || true;

			return new Promise(function(resolve) {
				var eventHandler = function(e) {
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

	this.runAppend = function runAppend(saveRaport) {
		return function() {
			saveRaport = saveRaport || true;

			return new Promise(function(resolve) {
				var eventHandler = function(e) {
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

	this.clean = function clean() {
		return new Promise(function(resolve) {
			var eventHandler = function(e) {
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

		$scope.$on('runCreate', function() {
			vm.runCreate(true);
		});

		$scope.$on('runAppend', function() {
			vm.runAppend();
		});

		$scope.$on('clean', function() {
			vm.clean();
		});

		vm.$doCheck = function() {
			// check if child components are fully initiated
			if (isRunning) {
				if (isViewFullyRendered()) {
					var testTime = common.calculateTestTime(new TestTimePair(vm.data.startTime, Date.now()));

					if (isRunAppendRunning()) {
						emitRunAppendFinishedEvent(testTime);

					} else { // runCreate is running
						emitRunCreateFinishedEvent(testTime);
					}
				}
			}
		};

		function emitRunAppendFinishedEvent(testTime) {
			rootElement.dispatchEvent(new CustomEvent(runAppendListener, {detail: {testTime: testTime}}));
		}

		function emitRunCreateFinishedEvent(testTime) {
			rootElement.dispatchEvent(new CustomEvent(runCreateListener, {detail: {testTime: testTime}}));
		}

		function isRunAppendRunning() {
			return vm.data.records.length > basic.getData().length;
		}

		function isViewFullyRendered() {
			var recordId = contentElement.querySelector('.record .record-id span');

			return recordId &&
						contentElement.querySelectorAll('.record').length === vm.data.records.length &&
						recordId.innerText === vm.data.records[0].id.toString();
		}

		vm.clean = function clean() {
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

		vm.runCreate = function runCreate(runningState) {
			return vm.clean()
				.then(function() {
					return new Promise(function(resolve) {
						$timeout(function () {
							isRunning = runningState;
							vm.data.startTime = Date.now();
						  vm.data.records = basic.getData();
						  rootElement.dispatchEvent(new CustomEvent(runCreateHelpListener));
						  resolve();
						});
					});
			});
		};

		vm.runAppend = function runAppend() {
			return new Promise(function(resolve) {
				var eventHandler = function(e) {
					rootElement.removeEventListener(runCreateHelpListener, eventHandler);
					e.preventDefault();

					$timeout(function () {
						var dataSet = vm.data.records.concat(basic.genDataSet());
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

AngularExperiment.prototype = new BasicExperiment();

module.exports = new AngularExperiment();
