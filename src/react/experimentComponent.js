app.react.ExperimentComponent = (function () {
	var startTime;
	var ExperimentComponentRecord = app.react.ExperimentComponentRecord;

	return React.createClass({
		propTypes: {
			data: React.PropTypes.array.isRequired,
			rootId: React.PropTypes.string.isRequired
		},

		componentDidUpdate: function() {
			var endTime = Date.now();
			var testTime = app.common.calculateTestTime(startTime, endTime);

			var event = new CustomEvent(this.props.rootId, {detail: {testTime: testTime}});
			document.getElementById(this.props.rootId).dispatchEvent(event);
		},

		render: function() {
			startTime = Date.now();
			var elements = this.props.data.map(function (val, index) {
				return React.createElement(ExperimentComponentRecord, {key: index, data: val});
				// return React.createElement('div', {key: index, className: 'record'},
				// 	React.createElement('div', {key: 1, className: 'record-avatar column two'},
				// 		React.createElement('img', {key: 1, src: 'img/avatar.png'})
				// 	),
				// 	React.createElement('div', {key: 2, className: 'record-data columns ten'}, [
				// 		React.createElement('div', {key: 1, className: 'record-name'},
				// 			React.createElement('span', {key: 1}, 'Name '),
				// 			React.createElement('span', {key: 2}, 'Surname')
				// 		),
				// 		React.createElement('div', {key: 2, className: 'record-id'},
				// 			React.createElement('span', {key: 1}, val.id)
				// 		),
				// 		React.createElement('div', {key: 3, className: 'record-desc'},
				// 			React.createElement('span', {key: 1}, 'Description')
				// 		),
				// 		React.createElement('div', {key: 4, className: 'record-sm'}, [
				// 			React.createElement('a', {key: 1, href: 'https://www.facebook.com/appdy.net'},
				// 				React.createElement('img', {key: 1, src: 'img/facebook.png'})
				// 			),
				// 			React.createElement('a', {key: 5, href: 'https://twitter.com/AppdyApp'},
				// 				React.createElement('img', {key: 1, src: 'img/twitter.png'})
				// 			),
				// 			React.createElement('a', {key: 6, href: 'https://linkedin.com'},
				// 				React.createElement('img', {key: 1, src: 'img/linkedin.png'})
				// 			)
				// 		])
				// 	])
				// );
			});

			return React.createElement('div', {}, elements);
		}
	});
})();
