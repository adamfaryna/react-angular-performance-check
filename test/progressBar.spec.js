const pug = require('pug');
const jsdom = require('jsdom-global');
const expect = require('chai').expect;

// global.document = 
jsdom(pug.renderFile('views/index.pug'));
// global.document = window.document;
// global.window = global.document.defaultView;
// global.navigator = window.navigator = {};
// global.Node = window.Node;

const progressBar = require('../public/javascripts/progressBar');

describe('progressBar', () => {
	it('should show up', () => {
		progressBar.show();
		expect(global.document.getElementById('progress_bar').classList.contains('hidden')).to.be.false;
	});

	it('should hide', () => {
		progressBar.hide();
		expect(global.document.getElementById('progress_bar').classList.contains('hidden')).to.be.true;
	});
});
