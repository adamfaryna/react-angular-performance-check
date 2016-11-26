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

module.exports = BasicExperiment;
