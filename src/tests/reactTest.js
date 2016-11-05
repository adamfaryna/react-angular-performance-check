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
				this.clean();

				setTimeout(function () {
					var eventHandler = function(e) {
						rootElement.removeEventListener(rootElementId, eventHandler);
						self.raports.push(e.detail.testTime);
						testTimeElement.innerHTML = app.common.formatTestTime(e.detail.testTime);
						resolve();
					}

					rootElement.addEventListener(rootElementId, eventHandler);
					self.renderElement(app.getData());
				}, 50);
			});
		};

		this.clean = function() {
			ReactTest.prototype.clean.apply(self);
			startTime = null;
			testTime = '';
			testTimeElement.innerHTML = '';
			this.renderElement([]);
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
