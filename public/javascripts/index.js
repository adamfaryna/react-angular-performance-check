var app = (function () {
	var testsControls = document.getElementById('testsControls');
	var progressBar = document.getElementById('progressBar');
	var form = document.getElementById('form');
	var log = testsControls.querySelector('.log');
	var dataRecords = [];

	var defaults = {
		iterations: 20,
		dataSetSize: 200
	};

	var nameIndex = 0;
	var surnameIndex = 0;
	var descriptionIndex = 0;

	var basicId = 0;
	var basicName = genRandomString();
	var basicSurname = genRandomString();
	var basicDescription = genRandomString();

	function genData() {
		return {
			id: ++basicId,
			name: basicName + (++nameIndex),
			surname: basicSurname + (++surnameIndex),
			description: basicDescription + (++descriptionIndex)
		};
	}

	function genRandomString() {
		return Math.random().toString(36).substr(2, 5);
	}

	function getData() {
		return dataRecords;
	}

	function genDataSet() {
		var dataSetSize = form.getElementsByTagName('input').namedItem('dataSetSize');
		var dataSetSizeVal = dataSetSize.value ? parseInt(dataSetSize.value) : defaults.dataSetSize;
		var data = [];

		for (var i = 0; i !== dataSetSizeVal; i++) {
			data[i] = genData();
		}

		return data;
	}

	function prepareBaseDataSet() {
		return new Promise(function (resolve) {
			dataRecords = genDataSet();
			log.innerHTML = 'Data set READY! ' + dataRecords.length + ' elements.';
			resolve();
		});
	}

	function showProgressBar() {
		return new Promise(function (resolve) {
			progressBar.show();
			setTimeout(resolve, 100);
		});
	}

	function hideProgressBar() {
		return new Promise(function (resolve) {
			progressBar.hide();
			setTimeout(resolve, 100);
		});
	}

	prepareBaseDataSet();

	return {
		defaults: defaults,
		getData: getData,
		genDataSet: genDataSet,
		prepareBaseDataSet: prepareBaseDataSet,
		showProgressBar: showProgressBar,
		hideProgressBar: hideProgressBar,
		experiment: {
			framework: {}
		},
		angular: {},
		react: {}
	};
})();
