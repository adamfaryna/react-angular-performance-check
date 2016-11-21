(function () {
	var app,
		common,
		commonDom,
		progressBar;

	if (typeof require === 'undefined') {
		app = window.app;
		common = window.app.common;
		commonDom = window.app.common.dom;
		progressBar = window.app.progressBar;

	} else {
		app = require('../app');
		common = require('../commons');
		commonDom = require('../commonsDom');
		progressBar = require('../progressBar');
	}

	var form = document.getElementById('form');
	var raport = document.getElementById('raport');
	var raportBodyCreate = raport.querySelector('#createRaportTable tbody');
	var raportBodyAppend = raport.querySelector('#appendRaportTable tbody');
	var iterationsNumber = form.getElementsByTagName('input').namedItem('iterationsNumber');
	var experimentFrameworks = typeof require === 'undefined' ? window.app.experiment.framework : [
		require('framework/angularExperiment'),
		require('framework/angularReactExperiment'),
		require('framework/reactExperiment'),
		require('framework/vanillaExperiment')
	];

	function cleanReport() {
		return new Promise(function(resolve) {
			commonDom.removeAllChilds(raportBodyCreate);
			commonDom.removeAllChilds(raportBodyAppend);

			for (var key in experimentFrameworks) {
				if (experimentFrameworks.hasOwnProperty(key)) {
					experimentFrameworks[key].clean();
					experimentFrameworks[key].cleanRaport();
				}
			}

			setTimeout(resolve, 50);
		});
	}

	function run() {
		var iterationsNumberVal = iterationsNumber.value ? parseInt(iterationsNumber.value) : app.defaults.iterations;

		var promise = cleanReport()
			.then(showReport)
			.then(app.show)
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

		return promise.then(progressBar.hide);
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
		return new Promise(function(resolve) {
			commonDom.show(raport);
			setTimeout(resolve, 50);
		});
	}

	var batch = {
		run: run
	};

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = batch;

	} else if (window.app) {
		window.app.experiment.batch = batch;
		
	} else {
		throw new Error('No application context nor modules found!');
	}
})();
