app.tests.react = (function () {
	var rootElementId = 'reactApp';
	var TestComponent = app.react.TestComponent;
	var rootElement = document.getElementById(rootElementId);
	var collectionRootElement = app.common.getCollectionRootElement(rootElementId);
	var testTimeElement = app.common.getTestTimeElement(rootElementId);
	var startTime = null;
	var testTime = '';

	rootElement.addEventListener(rootElementId, function (e) {
		testTimeElement.innerHTML = e.detail.testTime;	
	});

	var renderElement = function (data) {
		ReactDOM.render(React.createElement(TestComponent, {data: data, rootId: rootElementId}), collectionRootElement);
	};

	var cleanTest = function() {
		startTime = null;
		testTime = '';
		testTimeElement.innerHTML = '';
		renderElement([]);
	}

	return {
		runTest: function() {
			cleanTest();

			setTimeout(function () {
				renderElement(app.getData());
			}, 1000);
		}
	};
})();
