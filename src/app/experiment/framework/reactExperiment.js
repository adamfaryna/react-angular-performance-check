var name = 'React';
var rootElementId = '.react-app';

var React = require('react');
var ReactDOM = require('react-dom');

var basic = require('../../basic');
var common = require('../../commons');
var ExperimentComponent = require('../../react/experimentComponent');
var BasicExperiment = require('../basicExperiment');

var rootElement = common.getExperimentRootElement(rootElementId);
var collectionRootElement = common.getCollectionRootElement(rootElementId);
var testTimeElement = common.getTestTimeElement(rootElementId);
var testElementsCountElement = common.getTestElementsCountElement(rootElementId);
var runCreateListener = rootElementId + 'runCreate';
var runAppendListener = rootElementId + 'runAppend';
var cleanListener = rootElementId + 'clean';

function ReactExperiment() {
	var self = this;
	this.name = name;
	this.rootElementId = rootElementId;

	this.runCreate = function(saveRaport) {
		return function () {
			saveRaport = saveRaport !== undefined ? saveRaport : true;

			return new Promise(function(resolve) {
				self.clean()
					.then(function () {
						var eventHandler = function(e) {
							rootElement.removeEventListener(runCreateListener, eventHandler);
							e.preventDefault();

							var testTime = e.detail.testTime;
							testTimeElement.innerHTML = common.formatTestTime(testTime);
							testElementsCountElement.innerHTML = common.getTestElementsCount(rootElementId);

							if (saveRaport) {
								self.raports.createOperations.push(testTime);
							}

							resolve();
						};

						rootElement.addEventListener(runCreateListener, eventHandler);
						self.renderElement(basic.getData(), runCreateListener);
					});
			});
		};
	};

	this.runAppend = function(saveRaport) {
		return function () {
			saveRaport = saveRaport !== undefined ? saveRaport : true;

			return new Promise(function(resolve) {
				var createEventHandler = function(e) {
					rootElement.removeEventListener(runCreateListener, createEventHandler);
					e.preventDefault();

					var appendEventHandler = function(e) {
						rootElement.removeEventListener(runAppendListener, appendEventHandler);
						e.preventDefault();

						var testTime = e.detail.testTime;
						testTimeElement.innerHTML = common.formatTestTime(testTime);
						testElementsCountElement.innerHTML = common.getTestElementsCount(rootElementId);

						if (saveRaport) {
							self.raports.appendOperations.push(testTime);
						}
						
						resolve();
					};

					rootElement.addEventListener(runAppendListener, appendEventHandler);

					var dataSet = basic.getData().concat(basic.genDataSet());
					self.renderElement(dataSet, runAppendListener);
				}

				rootElement.addEventListener(runCreateListener, createEventHandler);
				self.runCreate(false)();
			});
		};
	};

	this.clean = function() {
		return new Promise(function(resolve) {
			testTimeElement.innerHTML = '';

			var eventHandler = function(e) {
				rootElement.removeEventListener(cleanListener, eventHandler);
				e.preventDefault();
				resolve();
			};

			rootElement.addEventListener(cleanListener, eventHandler);
			self.renderElement([], cleanListener);
		});
	};

	this.renderElement = function(data, eventName) {
		ReactDOM.render(React.createElement(ExperimentComponent, {data: data, rootId: rootElementId, eventName: eventName}), collectionRootElement);
	};

	this.clean();
}

ReactExperiment.prototype = new BasicExperiment();
reactExperiment = new ReactExperiment();

module.exports = reactExperiment;
