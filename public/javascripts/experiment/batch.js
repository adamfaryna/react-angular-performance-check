app.experiment.batch = (function () {
	var common = app.common;
	var form = document.getElementById('form');
	var raport = document.getElementById('raport');
	var raportBodyCreate = raport.querySelector('#createRaportTable tbody');
	var raportBodyAppend = raport.querySelector('#appendRaportTable tbody');
	var iterationsNumber = form.getElementsByTagName('input').namedItem('iterationsNumber');
	var experimentFrameworks = app.experiment.framework;

	function cleanReport() {
		return new Promise(function (resolve) {
			raportBodyCreate.removeAllChilds();
			raportBodyAppend.removeAllChilds();

			for (var key in experimentFrameworks) {
				if (experimentFrameworks.hasOwnProperty(key)) {
					experimentFrameworks[key].clean();
					experimentFrameworks[key].cleanRaport();
				}
			}

			setTimeout(resolve, 50);
		});
	}

	function performExperiments() {
		var iterationsNumberVal = iterationsNumber.value ? parseInt(iterationsNumber.value) : app.defaults.iterations;

		var promise = cleanReport()
			.then(showReport)
			.then(app.showProgressBar)
			.then(app.prepareBaseDataSet);

		for (var key in experimentFrameworks) {
			if (experimentFrameworks.hasOwnProperty(key)) {
				var experiment = experimentFrameworks[key];
				experiment.clean();

				for (var i = 0; i !== iterationsNumberVal; i++) {
					promise = promise
						.then(experiment.runCreate())
						.then(experiment.runAppend());
				}

				promise = promise
					.then(printRaport(experiment, raportBodyCreate))
					.then(printRaport(experiment, raportBodyAppend));
			}
		}

		return promise.then(app.hideProgressBar);
	}
	
	function printRaport(experiment, raportBody) {
		return function () {
			return new Promise(function (resolve) {
				var raportRef;
				var raportElement = raportBody.parentElement.parentElement;

				if (raportElement.id === 'createRaportTable') {
					raportRef = experiment.raports.createOperations;

				} else if (raportElement.id === 'appendRaportTable') {
					raportRef = experiment.raports.appendOperations;

				} else {
					throw new Error('Invalid "raportBody" value "' + raportElement.id + '".');
				}

				var tr = document.createElement('tr');

				var nameColumn = document.createElement('td');
				nameColumn.innerHTML = experiment.name;

				var minColumn = document.createElement('td');
				minColumn.innerHTML = common.formatTestTime(common.getExperimentMin(raportRef));

				var maxColumn = document.createElement('td');
				maxColumn.innerHTML = common.formatTestTime(common.getExperimentMax(raportRef));

				var avgColumn = document.createElement('td');
				avgColumn.innerHTML = common.formatTestTime(common.getExperimentAvg(raportRef));

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
