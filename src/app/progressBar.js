var commonDom = require('./commonsDom');

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

module.exports = new ProgressBar();
