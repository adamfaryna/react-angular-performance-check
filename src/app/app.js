require('angular');
require('react');

var basic = require('./basic');
var	common = require('./commons');
require('./experiment/batch.js');

require('../style/style');
require('skeleton-css/css/skeleton')
require('../assets/favicon.ico');

(function bindButtons() {
	document.getElementById('create_data_set_button').onclick = basic.prepareBaseDataSet;
	document.getElementById('run_experiments_button').onclick = require('./experiment/batch').run;
	var experimentsContainer = document.getElementById('experiments_container');

	var experimentFrameworks = [
		require('./experiment/framework/angularExperiment'),
		require('./experiment/framework/angularReactExperiment'),
		require('./experiment/framework/reactExperiment'),
		require('./experiment/framework/vanillaExperiment')
	];

	for (var key in experimentFrameworks) {
		if (experimentFrameworks.hasOwnProperty(key)) {
			var experiment = experimentFrameworks[key];
			experimentsContainer.querySelector(experiment.rootElementId + ' .insert-action-button').onclick = experiment.runCreate(false);
			experimentsContainer.querySelector(experiment.rootElementId + ' .append-action-button').onclick = experiment.runAppend(false);
		}
	}
})();
