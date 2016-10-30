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

	return {
		getData: function() {
			return dataRecords;
		}
	};
})();

var tests = {
	vanilla: {},
	angular: {},
	react: {},
	angularReact: {}
};
