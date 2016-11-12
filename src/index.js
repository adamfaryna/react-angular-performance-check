var app = (function () {
	var testsControls = document.getElementById('testsControls');

	var dataRecordsSize = 10000;
	var dataRecords = new Array(dataRecordsSize);

	for (var i = 0; i !== dataRecordsSize; i++) {
		dataRecords[i] = genData();
	}

	function genData() {
		return Math.random();
	}

	function getData() {
		return dataRecords;
	}

	return {
		getData: getData,
		experiments: {},
		angular: {},
		react: {}
	};
})();
