var app = (function () {
	var appStatus = document.getElementById('appStatus');
	var dataRecordsSize = 10000;
	var dataRecords = new Array(dataRecordsSize);

	for (var i = 0; i !== dataRecordsSize; i++) {
		dataRecords[i] = genData();
	}

	appStatus.innerHTML = 'Data Ready!';

	function genData() {
		return Math.random();
	}

	function getData() {
		return dataRecords;
	}

	return {
		getData: getData,
		tests: {},
		common: {},
		angular: {},
		react: {}
	};
})();
