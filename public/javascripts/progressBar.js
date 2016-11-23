(function () {
	var commonDom = typeof require === 'undefined' ? app.common.dom : require('./commonsDom');

	function ProgressBar() {
		this.element = document.getElementById('progress_bar');
	}

	ProgressBar.prototype.show = function() {
		var self = this;

		return new Promise(function(resolve) {
			commonDom.show(self.element);
			setTimeout(resolve, 100);
		});
	};

	ProgressBar.prototype.hide = function() {
		var self = this;
		
		return new Promise(function(resolve) {
			commonDom.hide(self.element);
			setTimeout(resolve, 100);
		});
	};

	var progressBar = new ProgressBar();

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = progressBar;

	} else if (window.app) {
		window.app.progressBar = progressBar;
		
	} else {
		throw new Error('No application context nor modules found!');
	}
})();
