(function () {
	var app,
		common,
		ExperimentComponentRecord,
		TestTimePair;

	var React = window.React;

	if (typeof require === 'undefined') {
		app = window.app;
		common = window.app.common;
		ExperimentComponentRecord = window.app.react.ExperimentComponentRecord;
		TestTimePair = window.app.model.TestTimePair;

	} else {
		app = require('../app');
		common = require('../commons');
		ExperimentComponentRecord = require('./ExperimentComponentRecord');
		TestTimePair = require('../model/testTimePair');
	}

	var startTime;

	var ExperimentComponent = React.createClass({
		propTypes: {
			data: React.PropTypes.array.isRequired,
			rootId: React.PropTypes.string.isRequired,
			eventName: React.PropTypes.string.isRequired
		},
		
		componentDidUpdate: function() {
			var endTime = Date.now();
			var testTime = common.calculateTestTime(new TestTimePair(startTime, endTime));

			var event = new CustomEvent(this.props.eventName, {detail: {testTime: testTime}});
			common.getExperimentRootElement(this.props.rootId).dispatchEvent(event);
		},

		render: function() {
			startTime = Date.now();
			var elements = this.props.data.map(function (val, index) {
				return React.createElement(ExperimentComponentRecord, {key: index, data: val});
			});

			return React.createElement('div', {}, elements);
		}
	});

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = ExperimentComponent;

	} else if (window.app) {
		window.app.react.ExperimentComponent = ExperimentComponent;
		
	} else {
		throw new Error('No application context nor modules found!');
	}
})();
