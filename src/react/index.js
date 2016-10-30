tests.react = (function () {
	var rootElement = document.querySelector('#reactApp .content');
	var testTimeElement = document.querySelector('#reactApp .test-time');
	var startTime = null;
	var testTime = '';

	var TestComponent = React.createClass({
		getInitialState: function() {
			return {
				started: false
			};
		},

		componentDidUpdate: function() {
			if (started) {
				var endTime = Date.now();
				testTime = (endTime - startTime) + 'ms';
				testTimeElement.innerHTML = testTime;
				started = false;
			}
		},

		render: function() {
			started = true;
			startTime = Date.now();

			var elements = this.props.data.map(function (val, index) {
				return React.createElement('div', {key: index}, val);
			});

			return React.createElement('div', {}, elements);
		}
	});

	var cleanTest = function() {
		startTime = null;
		testTime = '';
		ReactDOM.render(React.createElement(TestComponent, {data: []}), rootElement);
	}

	return {
		runTest: function() {
			cleanTest();
			ReactDOM.render(React.createElement(TestComponent, {data: app.getData()}), rootElement);
		}
	};
})();
