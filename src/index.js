var app = (function () {
	var testsControls = document.getElementById('testsControls');
	var progressBar = document.getElementById('progressBar');
	var form = document.getElementById('form');
	var log = testsControls.querySelector('.log');
	var dataRecords = [];

	Element.prototype.hasClass = function(className) {
	  if (this.classList) {
	    return this.classList.contains(className);

	  } else {
	    return !!this.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	  }
	};

	Element.prototype.addClass = function(className) {
	  if (this.classList) {
	    this.classList.add(className);

	  } else if (!this.hasClass(this, className)) {
			this.className += " " + className;
	  }
	};

	Element.prototype.removeClass = function(className) {
		if (this.classList) {
		  this.classList.remove(className);

		} else if (this.hasClass(this, className)) {
		  var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
		  this.className = this.className.replace(reg, ' ');
		}
	};

	Element.prototype.hide = function() {
		this.addClass('hidden');
	};

	Element.prototype.show = function() {
		this.removeClass('hidden');
	};

	function genData() {
		return Math.random();
	}

	function getData() {
		return dataRecords;
	}

	function prepareDataSet() {
		var dataSetSizeVal;

		return new Promise(function (resolve) {
			var dataSetSize = form.getElementsByTagName('input').namedItem('dataSetSize');
			dataSetSizeVal = dataSetSize.value ? parseInt(dataSetSize.value) : 10000;
			dataRecords = [];

			for (var i = 0; i !== dataSetSizeVal; i++) {
				dataRecords[i] = genData();
			}

			resolve();
		})
		.then(function () {
			log.innerHTML = 'Data set READY! ' + dataSetSizeVal + ' elements.';
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
			resolve();
		});
	}

	return {
		getData: getData,
		prepareDataSet: prepareDataSet,
		showProgressBar: showProgressBar,
		hideProgressBar: hideProgressBar,
		experiments: {},
		angular: {},
		react: {}
	};
})();
