const pug = require('pug');
const jsdom = require('jsdom-global');
const expect = require('chai').expect;

jsdom(pug.renderFile('views/index.pug'));

const document = global.document;

describe('index view', () => {
	it('should contain proper header');
	it('should contain proper sample record block');
	it('should contain proper, hidden progress bar');
	it('should contain proper Angular experiment block');
	it('should contain proper React experiment block');
	it('should contain proper Vanilla experiment block');
	it('should contain proper Angular-React experiment block');
	it('should contain proper, hidden raports block');
	it('should contain proper footer');
});
