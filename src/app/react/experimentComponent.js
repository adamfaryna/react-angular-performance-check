var React = require('react');
var app = require('../app');
var	common = require('../commons');
var ExperimentComponentRecord = require('./ExperimentComponentRecord');
var TestTimePair = require('../model/testTimePair');

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

module.exports = ExperimentComponent;
