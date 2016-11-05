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
		if (this.state.started) {
			var endTime = Date.now();
			var testTime = app.common.calculateTestTime(startTime, endTime);
			var event = new CustomEvent(this.props.rootId, {detail: {testTime: testTime}});
			document.getElementById(this.props.rootId).dispatchEvent(event);
			this.state.started = false;
		}
	},

	render: function() {
		if (this.props.data.length) {
			this.state.started = true;
			startTime = Date.now();
		}

		var elements = this.props.data.map(function (val, index) {
			return React.createElement('div', {key: index}, val);
		});

		return React.createElement('div', {}, elements);
	}
});
