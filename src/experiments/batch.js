app.batch = (function () {
	var common = app.common;
	var form = document.getElementById('form');
	var raport = document.getElementById('raport');
	var raportBody = raport.querySelector('#raportTable tbody');
	var iterationsNumber = form.getElementsByTagName('input').namedItem('iterationsNumber');

	function cleanReport() {
		return new Promise(function (resolve) {
			var elements = raportBody.getElementsByTagName('tr');

			while(raportBody.children.length !== 0) {
				raportBody.removeChild(raportBody.children[0]);
			}

			Object.keys(app.experiments).forEach(function (key) {
				app.experiments[key].clean();
			});

			setTimeout(resolve, 50);
		});
	}

	function performExperiments() {
		var iterationsNumberVal = iterationsNumber.value ? parseInt(iterationsNumber.value) : 30;

		var promise = cleanReport()
			.then(showReport)
			.then(app.showProgressBar)
			.then(app.prepareDataSet);

		Object.keys(app.experiments).forEach(function (key) {
			var experiment = app.experiments[key];
			experiment.clean();

			for (var i = 0; i !== iterationsNumberVal; i++) {
				promise = promise.then(experiment.run);
			}

			promise = promise.then(printRaport(experiment))
		});

		return promise.then(app.hideProgressBar);
	}
	
	function printRaport(experiment) {
		return function () {
			return new Promise(function (resolve) {
				var tr = document.createElement('tr');

				var nameColumn = document.createElement('td');
				nameColumn.appendChild(document.createTextNode(experiment.name));

				var minColumn = document.createElement('td');
				minColumn.appendChild(document.createTextNode(common.getExperimentMin(experiment) + 'ms'));

				var maxColumn = document.createElement('td');
				maxColumn.appendChild(document.createTextNode(common.getExperimentMax(experiment) + 'ms'));

				var avgColumn = document.createElement('td');
				avgColumn.appendChild(document.createTextNode(common.getExperimentAvg(experiment) + 'ms'));

				tr.appendChild(nameColumn);
				tr.appendChild(minColumn);
				tr.appendChild(maxColumn);
				tr.appendChild(avgColumn);
				raportBody.appendChild(tr);

				setTimeout(resolve, 50);
			});
		};
	}

	function showReport() {
		return new Promise(function (resolve) {
			raport.show();
			setTimeout(resolve, 50);
		});
	}

	return {
		run: performExperiments,
		cleanReport: cleanReport
	};
})();
