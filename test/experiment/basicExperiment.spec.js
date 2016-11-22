const expect = require('chai').expect;
const BasicExperiment = require('../../public/javascripts/experiment/basicExperiment');

const METHOD_NOT_IMPLEMENTED_MESSAGE = 'Method not implemented!';

describe('BasicExperiment', () => {
	let basicExperiment;
	
	beforeEach(() => {
		basicExperiment = new BasicExperiment();
	});

	it('should contain empty list of raports of create operations', () => {
		expect(basicExperiment.raports.createOperations.length).to.be.equal(0);
	});

	it('should contain empty list of raports of append operations', () => {
		expect(basicExperiment.raports.appendOperations.length).to.be.equal(0);
	});

	describe('runCreate method', () => {
		const basicExperiment = new BasicExperiment();

		it(`should throw error "${METHOD_NOT_IMPLEMENTED_MESSAGE}"`, () => {
			expect(() => { basicExperiment.runCreate(); }).to.throw(METHOD_NOT_IMPLEMENTED_MESSAGE);
		});
	});

	describe('runAppend method', () => {
		it(`should throw error "${METHOD_NOT_IMPLEMENTED_MESSAGE}"`, () => {
			expect(() => { basicExperiment.runAppend(); }).to.throw(METHOD_NOT_IMPLEMENTED_MESSAGE);
		});
	});

	describe('clean method', () => {
		it(`should throw error "${METHOD_NOT_IMPLEMENTED_MESSAGE}"`, () => {
			expect(() => { basicExperiment.clean(); }).to.throw(METHOD_NOT_IMPLEMENTED_MESSAGE);
		});
	});

	describe('cleanRaport method', () => {
		it('should delete all raports binded to it', () => {
			basicExperiment.raports.createOperations = [123, 456];
			basicExperiment.raports.appendOperations = [789, 1111];
			basicExperiment.cleanRaport();
			expect(basicExperiment.raports.createOperations.length).to.be.equal(0);
			expect(basicExperiment.raports.appendOperations.length).to.be.equal(0);
		});
	});
});
