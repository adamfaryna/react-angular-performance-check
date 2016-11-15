app.BasicExperiment = (function () {
	function BasicExperiment() {
		this.raports = {
			createOperations: [],
			appendOperations: []
		};
	}

	BasicExperiment.prototype.runCreate = function runCreate() {
		throw new Error('Method not defined!');
	}

	BasicExperiment.prototype.runAppend = function runAppend() {
		throw new Error('Method not defined!');
	}

	BasicExperiment.prototype.clean = function clean() {
		throw new Error('Method not defined!');
	};

	BasicExperiment.prototype.cleanRaport = function cleanRaport() {
		this.raports = {
			createOperations: [],
			appendOperations: []
		};
	};

	return BasicExperiment;
})();
