(function () {
	var name = 'Angular.js & React.js';
	var rootElementId = 'angularReactApp';
	var common = app.common;
	var TestComponent = app.react.TestComponent;
	var rootElement = document.getElementById('angularReactApp');
	var collectionRootElement = common.getCollectionRootElement(rootElementId);
		
	function AngularReactTest() {
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
			.module('angularReactApp', [])
			.directive('onFinish', app.angular.OnFinish)
			.controller('mainController', MainController);

		MainController.$inject = ['$scope', '$timeout'];
		var scope;

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
				return new Promise(function(resolve) {
					vm.clean();

					$timeout(function () {
						var eventHandler = function(e) {
							rootElement.removeEventListener('inner', eventHandler);		

							$timeout(function () {
								self.raports.push(e.detail.testTime);
								$scope.data.testTime = common.formatTestTime(e.detail.testTime);
								resolve();
							});
						};

						rootElement.addEventListener('inner', eventHandler);
						$scope.data.startTime = Date.now();
						$scope.data.records = app.getData();			
					});
				});
			};

			$scope.$watchCollection('data.records', function (records) {
				var eventHandler = function(e) {
					rootElement.removeEventListener(rootElementId, eventHandler);		

					var event = new CustomEvent('inner', e);
					rootElement.dispatchEvent(event);
				};

				rootElement.addEventListener(rootElementId, eventHandler);

				var component = React.createElement(TestComponent, {data: records || [], rootId: rootElementId});
				ReactDOM.render(component, collectionRootElement);
			});

			$scope.$on('$destroy', function () {
			  ReactDOM.unmountComponentAtNode(collectionRootElement);
			});

			vm.clean = function () {
				AngularReactTest.prototype.clean.apply(self);
				$scope.data.startTime = '';
				$scope.data.endTime = '';
				$scope.data.testTime = '';
				$scope.data.records = [];
			}
		}

		angular.bootstrap(rootElement, ['angularReactApp']);
	}

	AngularReactTest.prototype = new app.Basic();
	return new AngularReactTest();
})();
