var common = {
	calculateTestTime: function (testTime) {
		if (!testTime || !testTime.startTime || !testTime.endTime) {
			throw new Error('Start time and end time has to be provided!');
		}

		return testTime.endTime - testTime.startTime;
	},
	formatTestTime: function(testTime) {
		if (!testTime) {
			throw new Error('Parameter must be provided!');
		}

		if (isNaN(testTime)) {
			throw new Error('Parameter must be a number!');
		}

		return testTime + 'ms';
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
	},
	getExperimentsRootElement: function() {
		return document.getElementById('experiments_container');
	},
	getExperimentRootElement: function(rootId) {
		if (!rootId) {
			throw new Error('Valid experiment selector must be provided!');
		}
		return this.getExperimentsRootElement().querySelector(rootId);
	},
	getTestTimeElement: function(rootId) {
		if (!rootId) {
			throw new Error('Valid experiment selector must be provided!');
		}
		return this.getExperimentsRootElement().querySelector(rootId + ' .test-time');
	},
	getTestElementsCountElement: function(rootId) {
		if (!rootId) {
			throw new Error('Valid experiment selector must be provided!');
		}
		return this.getExperimentsRootElement().querySelector(rootId + ' .test-elements');
	},
	getTestElementsCount: function(rootId) {
		if (!rootId) {
			throw new Error('Valid experiment selector must be provided!');
		}
		return this.getExperimentsRootElement().querySelectorAll(rootId + ' .content .record').length;
	},
	getCollectionRootElement: function(rootId) {
		if (!rootId) {
			throw new Error('Valid experiment selector must be provided!');
		}
		return this.getExperimentsRootElement().querySelector(rootId + ' .content');
	}
};

module.exports = common;
