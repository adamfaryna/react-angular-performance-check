app.common = {
	calculateTestTime: function (startTime, endTime) {
		return endTime - startTime;
	},
	formatTestTime: function(testTime) {
		return testTime + 'ms';
	},
	getExperimentsRootElement: function() {
		return document.getElementById('experimentsContainer');
	},
	getExperimentRootElement: function(rootId) {
		return this.getExperimentsRootElement().querySelector(rootId);
	},
	getTestTimeElement: function(rootId) {
		return this.getExperimentsRootElement().querySelector(rootId + ' .test-time');
	},
	getTestElementsCountElement: function(rootId) {
		return this.getExperimentsRootElement().querySelector(rootId + ' .test-elements');
	},
	getTestElementsCount: function(rootId) {
		return this.getExperimentsRootElement().querySelectorAll(rootId + ' .content .record').length;
	},
	getCollectionRootElement: function(rootId) {
		return this.getExperimentsRootElement().querySelector(rootId + ' .content');
	},
	getExperimentAvg: function(collection) {
		return (collection.reduce(function (a, b) {
			return a + b;
		}, 0) / collection.length).toFixed(2);
	},
	getExperimentMin: function(collection) {
		return collection.reduce(function (a, b) {
			return a < b ? a : b;
		}, Number.MAX_VALUE)
	},
	getExperimentMax: function(collection) {
		return collection.reduce(function (a, b) {
			return a < b ? b : a;
		}, Number.MIN_VALUE);
	}
};
