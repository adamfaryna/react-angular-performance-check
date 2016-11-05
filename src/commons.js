app.common = {
	calculateTestTime: function (startTime, endTime) {
		return (endTime - startTime);
	},
	formatTestTime: function(testTime) {
		return testTime + 'ms';
	},
	getTestTimeElement: function(rootId) {
		return document.querySelector('#' + rootId + ' .test-time');
	},
	getCollectionRootElement: function(rootId) {
		return document.querySelector('#' + rootId + ' .content');
	},
	getExperimentAvg: function(experiment) {
		return experiment.raports.reduce(function (a, b) {
			return a + b;
		}, 0) / experiment.raports.length;
	},
	getExperimentMin: function(experiment) {
		return experiment.raports.reduce(function (a, b) {
			return a < b ? a : b;
		}, Number.MAX_VALUE)
	},
	getExperimentMax: function(experiment) {
		return experiment.raports.reduce(function (a, b) {
			return a < b ? b : a;
		}, Number.MIN_VALUE);
	}
};
