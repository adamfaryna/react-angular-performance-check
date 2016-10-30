app.common = {
	formatTestTime: function(startTime, endTime) {
		return (endTime - startTime) + 'ms';
	},
	getTestTimeElement: function(rootId) {
		return document.querySelector('#' + rootId + ' .test-time');
	},
	getCollectionRootElement: function(rootId) {
		return document.querySelector('#' + rootId + ' .content');
	}
};
