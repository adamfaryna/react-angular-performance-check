const app = require('../public/javascripts/app');
const expect = require('chai').expect;

describe('app', () => {
	describe('"defaults" property', () => {
		it('should contain property "iterations" equal "20"', () => {
			expect(app.defaults.iterations).to.be.equal(20);
		});

		it('should contain property "dataSetSize" equal "200"', () => {
			expect(app.defaults.dataSetSize).to.be.equal(200);
		});
	});

	describe('"experiment" property', () => {
		it('should contain empty property object "framework"', () => {
			expect(Object.keys(app.experiment.framework).length).to.be.equal(0);
		})
	});

	it('should contain empty property object "common"', () => {
		expect(Object.keys(app.common).length).to.be.equal(0);
	});

	it('should contain property "model"', () => {
		expect(Object.keys(app.model).length).to.be.equal(0);
	});

	it('should contain property "angular"', () => {
		expect(Object.keys(app.angular).length).to.be.equal(0);
	});

	it('should contain property react', () => {
		expect(Object.keys(app.react).length).to.be.equal(0);
	});
});
