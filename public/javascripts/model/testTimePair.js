(function () {
	function TestTimePair(startTime, endTime) {
		this.startTime = startTime;
		this.endTime = endTime;
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = TestTimePair;
		
	} else if (window.app) {
		window.app.model.TestTimePair = TestTimePair;
		
	} else {
		throw new Error('No application context nor modules found!');
	}
})();
