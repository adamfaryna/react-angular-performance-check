(function () {
	var app = {
		defaults: {
			iterations: 20,
			dataSetSize: 200
		},
		common: {},
		model: {},
		experiment: {
			framework: {}
		},
		angular: {},
		react: {}
	};

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = app;

	} else if (window) {
		window.app = app;
		
	} else {
		throw new Error('No application context nor modules found!');
	}
})();
