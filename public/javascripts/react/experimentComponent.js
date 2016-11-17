app.react.ExperimentComponent = (function () {
	var startTime;
	var ExperimentComponentRecord = app.react.ExperimentComponentRecord;

	return React.createClass({
		propTypes: {
			data: React.PropTypes.array.isRequired,
			rootId: React.PropTypes.string.isRequired,
			eventName: React.PropTypes.string.isRequired
		},
		
		componentDidUpdate: function() {
			var endTime = Date.now();
			var testTime = app.common.calculateTestTime(startTime, endTime);

			var event = new CustomEvent(this.props.eventName, {detail: {testTime: testTime}});
			document.getElementById(this.props.rootId).dispatchEvent(event);
		},

		render: function() {
			startTime = Date.now();
			var elements = this.props.data.map(function (val, index) {
				return React.createElement(ExperimentComponentRecord, {key: index, data: val});
			});

			return React.createElement('div', {}, elements);
		}
	});
})();
