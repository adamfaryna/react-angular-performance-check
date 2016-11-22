(function () {
	function BasicExperiment() {
		resetPropsState.call(this);
	}

	function resetPropsState() {
		this.raports = {
			createOperations: [],
			appendOperations: []
		};
	}

	BasicExperiment.prototype.runCreate = function runCreate() {
		throw new Error('Method not implemented!');
	};

	BasicExperiment.prototype.runAppend = function runAppend() {
		throw new Error('Method not implemented!');
	};

	BasicExperiment.prototype.clean = function clean() {
		throw new Error('Method not implemented!');
	};

	BasicExperiment.prototype.cleanRaport = function cleanRaport() {
		resetPropsState.call(this);
	};

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = BasicExperiment;

	} else if (window.app) {
		window.app.experiment.BasicExperiment = BasicExperiment;
		
	} else {
		throw new Error('No application context nor modules found!');
	}
})();
