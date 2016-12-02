var React = require('react');

var ExperimentComponentRecord = React.createClass({
	shouldComponentUpdate: function(nextProps, nextState) {
		if (nextProps) {
			return this.props.data.id === undefined || this.props.data.id === nextProps.data.id;
		}

		return false;
	},

	render: function () {
		return React.createElement('div', {className: 'record'},
			React.createElement('div', {className: 'record-avatar'},
				React.createElement('img', {src: 'images/avatar.png'})
			),
			React.createElement('div', {className: 'record-data'},
				React.createElement('div', {className: 'record-name'},
					React.createElement('span', {className: 'name'}, this.props.data.name + ' '),
					React.createElement('span', {className: 'surname'}, this.props.data.surname)
				),
				React.createElement('div', {className: 'record-id'},
					React.createElement('span', {}, this.props.data.id)
				),
				React.createElement('div', {className: 'record-desc'},
					React.createElement('span', {}, this.props.data.description)
				),
				React.createElement('div', {className: 'record-sm'}, 
					React.createElement('a', {href: 'https://www.facebook.com/appdy.net'},
						React.createElement('img', {src: 'images/facebook.png'})
					),
					React.createElement('a', {href: 'https://twitter.com/AppdyApp'},
						React.createElement('img', {src: 'images/twitter.png'})
					),
					React.createElement('a', {href: 'https://linkedin.com'},
						React.createElement('img', {src: 'images/linkedin.png'})
					)
				)
			)
		);
	}
});

module.exports = ExperimentComponentRecord;
