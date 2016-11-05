app.tests.react = (function () {
	var name = 'React.js';
	var rootElementId = 'reactApp';
	var TestComponent = app.react.TestComponent;
	var rootElement = document.getElementById(rootElementId);
	var collectionRootElement = app.common.getCollectionRootElement(rootElementId);
	var testTimeElement = app.common.getTestTimeElement(rootElementId);
	var startTime = null;
	var testTime = '';

	function ReactTest() {
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
							testTimeElement.innerHTML = app.common.formatTestTime(e.detail.testTime);
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
				self.renderElement([]);
				resolve();
			});
		};

		this.renderElement = function (data) {
			ReactDOM.render(React.createElement(TestComponent, {data: data, rootId: rootElementId}), collectionRootElement);
		};

		rootElement.addEventListener(rootElementId, function (e) {
			self.raports.push(e.detail.testTime);
			testTimeElement.innerHTML = app.common.formatTestTime(e.detail.testTime);
		});
	}

	ReactTest.prototype = new app.Basic();
	return new ReactTest();
})();
