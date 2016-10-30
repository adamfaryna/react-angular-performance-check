app.react.TestComponent = React.createClass({
	getInitialState: function() {
		return {
			started: false
		};
	},

	propTypes: {
		data: React.PropTypes.array.isRequired,
		rootId: React.PropTypes.string.isRequired
	},

	componentDidUpdate: function() {
		if (started) {
			var endTime = Date.now();
			testTime = app.common.formatTestTime(startTime, endTime);
			var event = new CustomEvent(this.props.rootId, {detail: {testTime: testTime}});
			document.getElementById(this.props.rootId).dispatchEvent(event);
			started = false;
		}
	},

	render: function() {
		if (this.props.data.length) {
			started = true;
			startTime = Date.now();
		}

		var elements = this.props.data.map(function (val, index) {
			return React.createElement('div', {key: index}, val);
		});

		return React.createElement('div', {}, elements);
	}
});
