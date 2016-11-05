app.batch = (function () {
	var common = app.common;
	var raportBody = raportTable.querySelector('#raportTable tbody');

	function cleanReport() {
		var elements = raportBody.getElementsByTagName('tr');

		for (var i = 0; i !== elements.length; i++) {
			var element = elements.item(0);
			if (element.className !== 'label') {
				element.parentNode.removeChild(element);
			}
		}

		Object.keys(app.tests).forEach(function (key) {
			app.tests[key].clean();
		});
	}

	function performExperiments(form) {
		cleanReport();
		showReport();

		var iterationsNumber = parseInt(form.getElementsByTagName('input').namedItem('iterationsNumber').value);

		// var callQueue = [];

		var promise = new Promise(function (resolve) {
			setTimeout(resolve, iterationsNumber * Object.keys(app.tests).length * 200);
		});

		Object.keys(app.tests).forEach(function (key) {
			var experiment = app.tests[key];
			experiment.clean();

			for (var i = 0; i !== iterationsNumber; i++) {
				// callQueue.push(experiment.run); 
				// experiment.run();
				promise = promise.then(experiment.run);
			}

			promise = promise.then(printRaport(experiment))

			// printRaport(experiment);
		});

		return promise.then(showReport);
	}
	
	function printRaport(experiment) {
		return new Promise(function (resolve) {
			var tr = document.createElement('tr');

			var nameColumn = document.createElement('td');
			nameColumn.appendChild(document.createTextNode(experiment.name));

			var minColumn = document.createElement('td');
			minColumn.appendChild(document.createTextNode(common.getExperimentMin(experiment)));

			var maxColumn = document.createElement('td');
			maxColumn.appendChild(document.createTextNode(common.getExperimentMax(experiment)));

			var avgColumn = document.createElement('td');
			avgColumn.appendChild(document.createTextNode(common.getExperimentAvg(experiment)));

			tr.appendChild(nameColumn);
			tr.appendChild(minColumn);
			tr.appendChild(maxColumn);
			tr.appendChild(avgColumn);
			raportBody.appendChild(tr);
			resolve();
		});
	}

	function showReport() {
		raportBody.setAttribute('style', 'display: block');
	}

	return {
		run: performExperiments
	};
})();
