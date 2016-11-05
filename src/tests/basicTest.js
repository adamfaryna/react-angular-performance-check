app.Basic = (function () {
	function BasicTest() {
		this.raports = [];
	}

	BasicTest.prototype.run = function run() {
		throw new Error('Method not defined!');
	}

	BasicTest.prototype.clean = function clean() {
		this.raports = [];
	};

	return BasicTest;
})();
