(function () {
	function BasicExperiment() {
		this.raports = {
			createOperations: [],
			appendOperations: []
		};
	}

	BasicExperiment.prototype.runCreate = function runCreate() {
		throw new Error('Method not defined!');
	};

	BasicExperiment.prototype.runAppend = function runAppend() {
		throw new Error('Method not defined!');
	};

	BasicExperiment.prototype.clean = function clean() {
		throw new Error('Method not defined!');
	};

	BasicExperiment.prototype.cleanRaport = function cleanRaport() {
		this.raports = {
			createOperations: [],
			appendOperations: []
		};
	};

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = BasicExperiment;

	} else if (window.app) {
		window.app.experiment.BasicExperiment = BasicExperiment
		
	} else {
		throw new Error('No application context nor modules found!');
	}
})();
