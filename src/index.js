var app = (function () {
	var dataRecordsSize = 10000;
	var dataRecords = new Array(dataRecordsSize);

	for (var i = 0; i !== dataRecordsSize; i++) {
		dataRecords[i] = genData();
	}

	document.getElementById('appStatus').innerHTML = 'Data Ready!';

	function genData() {
		return Math.random();
	}

	function getData() {
		return dataRecords;
	}

	return {
		getData: getData,
		tests: {
			vanilla: {},
			angular: {},
			react: {},
			angularReact: {}
		},
		commons: {},
		angular: {},
		react: {}
	};
})();
