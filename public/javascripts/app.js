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
		app.defaults = {
			iterations: 2,
			dataSetSize: 10
		};

		module.exports = app;

	} else if (window) {
		window.app = app;
		
	} else {
		throw new Error('No application context nor modules found!');
	}
})();
