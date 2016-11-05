app.tests.vanilla = (function () {
	var name = 'Vanilla.js';
	var rootElementId = 'vanillaApp';
	var common = app.common;
	var collectionRootElement = common.getCollectionRootElement(rootElementId);
	var testTimeElement = common.getTestTimeElement(rootElementId);

	function VanillaTest() {
		var self = this;
		this.name = name;	
		
		this.clean = function () {
			VanillaTest.prototype.clean.apply(self);

			while (collectionRootElement.firstChild) {
				collectionRootElement.removeChild(collectionRootElement.firstChild);
			}

			testTimeElement.innerHTML = '';
		};

		this.run = function() {
			return new Promise(function (resolve) {
				this.clean();

				setTimeout(function () {
					var data = app.getData();
					startTime = Date.now();
					var fragment = document.createDocumentFragment()
					
					for (var i = 0; i !== data.length; i++) {
						var div = document.createElement('div')
						div.innerHTML = data[i];
						fragment.appendChild(div);
					}
					
					collectionRootElement.appendChild(fragment);

					var endTime = Date.now();
					var testTime = common.calculateTestTime(startTime, endTime);
					self.raports.push(testTime);
					testTimeElement.innerHTML = common.formatTestTime(testTime);
					resolve();
				}, 50);
			};
		);
	}}

	VanillaTest.prototype = new app.Basic();
	return new VanillaTest();
})();
