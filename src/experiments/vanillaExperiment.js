app.experiments.vanilla = (function () {
	var name = 'Vanilla';
	var rootElementId = 'vanillaApp';
	var common = app.common;
	var collectionRootElement = common.getCollectionRootElement(rootElementId);
	var testTimeElement = common.getTestTimeElement(rootElementId);

	function VanillaExperiment() {
		var self = this;
		this.name = name;	
		
		this.clean = function () {
			return new Promise(function (resolve) {
				while (collectionRootElement.firstChild) {
					collectionRootElement.removeChild(collectionRootElement.firstChild);
				}

				testTimeElement.innerHTML = '';
				resolve();
			});
		};

		var elementTemplate = (function initElement() {
			var record = document.createElement('div');
			record.className = 'record';

			var recordAvatar = document.createElement('div');
			recordAvatar.className = 'record-avatar record-column two';

			var avatar = document.createElement('img');
			avatar.src = 'img/avatar.png';
			recordAvatar.appendChild(avatar);

			var recordData = document.createElement('div');
			recordData.className = 'record-data columns ten';

			var recordName = document.createElement('div');
			recordName.className = 'record-name';

			var name = document.createElement('span');
			name.className = 'name';
			var surname = document.createElement('span');
			surname.className = 'surname';
			recordName.appendChild(name);
			recordName.appendChild(surname);
			recordData.appendChild(recordName);

			var recordId = document.createElement('div');
			recordId.className = 'record-id';
			var idSpan = document.createElement('span');
			recordId.appendChild(idSpan);
			recordData.appendChild(recordId);

			var recordDataDisc = document.createElement('div');
			recordDataDisc.className = 'record-desc';
			var recordDataDiscSpan = document.createElement('span');
			recordDataDisc.appendChild(recordDataDiscSpan);
			recordData.appendChild(recordDataDisc);

			var recordSm = document.createElement('div');
			recordSm.className = 'record-sm';

			var facebookLink = document.createElement('a');
			var facebookImg = document.createElement('img');
			facebookLink.href = 'https://www.facebook.com/appdy.net';
			facebookImg.src = 'img/facebook.png';
			facebookLink.appendChild(facebookImg);
			recordSm.appendChild(facebookLink);

			var twitterLink = document.createElement('a');
			var twitterImg = document.createElement('img');
			twitterLink.href = 'https://twitter.com/AppdyApp';
			twitterImg.src = 'img/twitter.png';
			twitterLink.appendChild(twitterImg);
			recordSm.appendChild(twitterLink);

			var linkedInLink = document.createElement('a');
			var linkedInImg = document.createElement('img');
			linkedInLink.href = 'https://linkedin.com';
			linkedInImg.src = 'img/linkedin.png';
			linkedInLink.appendChild(linkedInImg);
			recordSm.appendChild(linkedInLink);

			recordData.appendChild(recordSm);

			record.appendChild(recordAvatar);
		  record.appendChild(recordData);
		  return record;
		})();

		function createElement(val) {
			var record = elementTemplate.cloneNode(true);
			record.querySelector('.record-data span.name').innerHTML = val.name + ' ';
			record.querySelector('.record-data span.surname').innerHTML = val.surname;
			record.querySelector('.record-id span').innerHTML = val.id;
			record.querySelector('.record-desc span').innerHTML = val.description;
			return record;
		}

		this.run = function() {
			return new Promise(function (resolve) {
				self.clean()
					.then(function () {
						var data = app.getData();
						startTime = Date.now();
						var fragment = document.createDocumentFragment();
						
						for (var i = 0; i !== data.length; i++) {
							var element = createElement(data[i]);
							fragment.appendChild(element);
						}
						
						collectionRootElement.appendChild(fragment);

						var endTime = Date.now();
						var testTime = common.calculateTestTime(startTime, endTime);
						self.raports.push(testTime);
						testTimeElement.innerHTML = common.formatTestTime(testTime);
						resolve();
					})
			});
		};
	}

	VanillaExperiment.prototype = new app.BasicExperiment();
	return new VanillaExperiment();
})();
