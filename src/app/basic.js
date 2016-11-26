var testsControls = document.getElementById('tests_controls');
var log = testsControls.querySelector('.log');
var form = document.getElementById('form');
var dataRecords = [];

var nameIndex = 0;
var surnameIndex = 0;
var descriptionIndex = 0;

var basicId = 0;
var basicName = genRandomString();
var basicSurname = genRandomString();
var basicDescription = genRandomString();

var	defaults = {
	iterations: 20,
	dataSetSize: 200
};

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

prepareBaseDataSet();

var app = {
	defaults: defaults,
	getData: getData,
	genDataSet: genDataSet,
	prepareBaseDataSet: prepareBaseDataSet
};

module.exports = app;
