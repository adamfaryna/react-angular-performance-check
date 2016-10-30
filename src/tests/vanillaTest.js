app.tests.vanilla = (function () {
	var rootElementId = 'vanillaApp';
	var collectionRootElement = app.common.getCollectionRootElement(rootElementId);
	var testTimeElement = app.common.getTestTimeElement(rootElementId);

	var cleanTest = function () {
		while (collectionRootElement.hasChildNodes()) {
			collectionRootElement.removeChild(collectionRootElement.firstChild);
		}

		testTimeElement.innerHTML = '';
	};

	return {
		runTest: function () {
			cleanTest();

			setTimeout(function () {
				var data = app.getData();
				startTime = Date.now();
				var fragment = document.createDocumentFragment()
				
				for (var i = 0; i !== data.length; i++) {
					var div = document.createElement('div')
					div.innerHTML = data[i];
					fragment.appendChild(div);
				}
				
				collectionRootElement.appendChild(fragment);

				var endTime = Date.now();
				var testTime = app.common.formatTestTime(startTime, endTime);
				testTimeElement.innerHTML = testTime;
			}, 1000);
		}
	};
})();
