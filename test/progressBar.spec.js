const pug = require('pug');
const jsdom = require('jsdom-global');
const expect = require('chai').expect;

jsdom(pug.renderFile('views/index.pug'));

const progressBar = require('../public/javascripts/progressBar');

describe('progressBar', () => {
	it('should show up', () => {
		progressBar.show();
		expect(document.getElementById('progressBar').classList.contains('hidden')).to.be.false;
	});

	it('should hide', () => {
		progressBar.hide();
		expect(document.getElementById('progressBar').classList.contains('hidden')).to.be.true;
	});
});
