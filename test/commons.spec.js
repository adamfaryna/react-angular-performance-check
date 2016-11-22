const jsdom = require('jsdom-global');
const pug = require('pug');
const expect = require('chai').expect;
const app = require('../public/javascripts/app');
const common = require('../public/javascripts/commons');

jsdom(pug.renderFile('views/index.pug'));

const TestTimePair = require('../public/javascripts/model/testTimePair');
const vanillaExperiment = require('../public/javascripts/experiment/framework/vanillaExperiment');

describe('Commons', () => {
	describe('calculateTestTime method', () => {
		const errorMessage = 'Start time and end time has to be provided!';

		it('should return correct difference between two timestamps', () => {
			const now = Date.now();
			const later = now + 1000;
			expect(common.calculateTestTime(new TestTimePair(now, later))).to.be.equal(1000);
		});

		it('should throw an error when testTime is not provided', () => {
			expect(() => { common.calculateTestTime(); }).to.throw(errorMessage);
		});

		it('should throw an error when start time is not provided', () => {
			expect(() => { common.calculateTestTime(undefined, Date.now()); }).to.throw(errorMessage);
		});

		it('should throw an error when end time is not provided', () => {
			expect(() => { common.calculateTestTime(Date.now()); }).to.throw(errorMessage);
		});
	});

	describe('formatTestTime method', () => {
		it('should add "ms" suffix to passed test time', () => {
			expect(common.formatTestTime(1000)).to.be.equal('1000ms');
		})

		it('should throw error when no parameter provided', () => {
			expect(() => { common.formatTestTime(); }).to.throw('Parameter must be provided!');
		});

		it('should throw error when no number parameter provided', () => {
			expect(() => { common.formatTestTime('abc'); }).to.throw('Parameter must be a number!');
		});		
	});

	// describe('getExperimentAvg method');
	// describe('getExperimentMin method');
	// describe('getExperimentMax method');

	describe('has Web API', () => {
		describe('getExperimentsRootElement method', () => {
			it('should return root element reference of all experiments', () => {
				expect(common.getExperimentsRootElement().id).to.be.equal('experimentsContainer');
			});
		});

		describe('getExperimentRootElement method', () => {
			it('should return root element of Angular experiment', () => {
				expect(common.getExperimentRootElement('.angular-app').classList.contains('angular-app')).to.be.true;
			});

			it('should throw error when no parameter passed', () => {
				expect(() => { common.getExperimentRootElement(); }).to.throw('Valid experiment selector must be provided!');
			})
		});

		describe('getTestTimeElement method', () => {
			it('should return test time element for React experiment', () => {
				expect(common.getTestTimeElement('.react-app').classList.contains('test-time')).to.be.true;
			});

			it('should throw error when no parameter passed', () => {
				expect(() => { common.getTestTimeElement(); }).to.throw('Valid experiment selector must be provided!');
			});
		});

		describe('getTestElementsCountElement method', () => {
			it('should return experiment elemenets count element', () => {
				expect(common.getTestElementsCountElement('.vanilla-app').classList.contains('test-elements')).to.be.true;
			});

			it('should throw error when no parameter passed', () => {
				expect(() => { common.getTestElementsCountElement() }).to.throw('Valid experiment selector must be provided!');
			});
		});

		describe('getTestElementsCount method', () => {
			// it.only('should return correct number of generated records number', () => {
			// 	return vanillaExperiment.runCreate(false)().then(() => {
			// 		expect(common.getTestElementsCount('.vanilla-app')).to.be.equal(app.defaults.dataSetSize);
			// 	});
			// });

			it('should throw error when no parameter passed', () => {
				expect(() => { common.getTestElementsCount(); }).to.throw('Valid experiment selector must be provided!');
			});
		});
		describe('getCollectionRootElement method', () => {
			it('should return correct reference to generation collection wrapper element', () => {
				expect(common.getCollectionRootElement('.vanilla-app').classList.contains('content')).to.be.true;
			});

			it('should throw error when no parameter passed', () => {
				expect(() => { common.getCollectionRootElement(); }).to.throw('Valid experiment selector must be provided!');
			});
		});
	});
});
