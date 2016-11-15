app.common = {
	calculateTestTime: function (startTime, endTime) {
		return endTime - startTime;
	},
	formatTestTime: function(testTime) {
		return testTime + 'ms';
	},
	getTestTimeElement: function(rootId) {
		return document.getElementById(rootId).querySelector('.test-time');
	},
	getTestElementsCountElement: function(rootId) {
		return document.getElementById(rootId).querySelector('.test-elements');
	},
	getTestElementsCount: function(rootId) {
		return document.getElementById(rootId).querySelectorAll('.content .record').length;
	},
	getCollectionRootElement: function(rootId) {
		return document.getElementById(rootId).querySelector('.content');
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
