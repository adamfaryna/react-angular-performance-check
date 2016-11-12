app.experiments.react = (function () {
	var name = 'React';
	var rootElementId = 'reactApp';
	var common = app.common;
	var ExperimentComponent = app.react.ExperimentComponent;
	var rootElement = document.getElementById(rootElementId);
	var collectionRootElement = common.getCollectionRootElement(rootElementId);
	var testTimeElement = common.getTestTimeElement(rootElementId);
	var startTime = null;
	var testTime = '';

	function ReactExperiment() {
		var self = this;
		this.name = name;
		this.run = function() {
			return new Promise(function (resolve) {
				self.clean()
					.then(function () {
						var eventHandler = function (e) {
							rootElement.removeEventListener(rootElementId, eventHandler);
							e.preventDefault();
							self.raports.push(e.detail.testTime);
							testTimeElement.innerHTML = common.formatTestTime(e.detail.testTime);
							resolve();
						};

						rootElement.addEventListener(rootElementId, eventHandler);
						self.renderElement(app.getData());
					});
			});
		};

		this.clean = function() {
			return new Promise(function (resolve) {
				startTime = null;
				testTime = '';
				testTimeElement.innerHTML = '';

				var eventHandler = function (e) {
					rootElement.removeEventListener(rootElementId, eventHandler);
					e.preventDefault();
					resolve();
				};

				rootElement.addEventListener(rootElementId, eventHandler);
				self.renderElement([]);
			});
		};

		this.renderElement = function (data) {
			ReactDOM.render(React.createElement(ExperimentComponent, {data: data, rootId: rootElementId}), collectionRootElement);
		};

		this.clean();
	}

	ReactExperiment.prototype = new app.BasicExperiment();
	return new ReactExperiment();
})();
