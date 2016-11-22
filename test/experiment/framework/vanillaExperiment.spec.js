const pug = require('pug');
const jsdom = require('jsdom-global');
const expect = require('chai').expect;

jsdom(pug.renderFile('views/index.pug'));

const vanillaExperiment = require('../../../public/javascripts/experiment/framework/vanillaExperiment');

describe('vanillaExperiment', () => {
	describe('runCreate method', () => {
		it('should run create experiment with default number of elements and wait for finish');
		it('should run create experiment and write raport afterwards');
	});

	describe('runAppend method', () => {
		it('should run append experiment with default number of elements and wait for finish');
		it('should run append experiment and write raport afterwards');
	});

	describe('clean method', () => {
		it('should clean component state and wait for finish');
	});
});
