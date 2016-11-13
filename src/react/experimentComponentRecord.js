app.react.ExperimentComponentRecord = (function () {
	return React.createClass({
		propTypes: {
			data: React.PropTypes.object.isRequired
		},

		shouldComponentUpdate: function(nextProps, nextState) {
			if (nextProps) {
				return this.props.data.id === 'undefined' || this.props.data.id === nextProps.data.id;
			}

			return false;
		},

		render: function() {
			return React.createElement('div', {key: this.props.data.index, className: 'record'},
				React.createElement('div', {key: 1, className: 'record-avatar column two'},
					React.createElement('img', {key: 1, src: 'img/avatar.png'})
				),
				React.createElement('div', {key: 2, className: 'record-data columns ten'}, [
					React.createElement('div', {key: 1, className: 'record-name'},
						React.createElement('span', {key: 1}, this.props.data.name + ' '),
						React.createElement('span', {key: 2}, this.props.data.surname)
					),
					React.createElement('div', {key: 2, className: 'record-id'},
						React.createElement('span', {key: 1}, this.props.data.id)
					),
					React.createElement('div', {key: 3, className: 'record-desc'},
						React.createElement('span', {key: 1}, this.props.data.description)
					),
					React.createElement('div', {key: 4, className: 'record-sm'}, [
						React.createElement('a', {key: 1, href: 'https://www.facebook.com/appdy.net'},
							React.createElement('img', {key: 1, src: 'img/facebook.png'})
						),
						React.createElement('a', {key: 2, href: 'https://twitter.com/AppdyApp'},
							React.createElement('img', {key: 1, src: 'img/twitter.png'})
						),
						React.createElement('a', {key: 3, href: 'https://linkedin.com'},
							React.createElement('img', {key: 1, src: 'img/linkedin.png'})
						)
					])
				])
			);
		}
	});
})();
