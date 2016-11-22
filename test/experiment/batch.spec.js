const pug = require('pug');
const jsdom = require('jsdom-global');
const expect = require('chai').expect;

describe('batch', () => {
	jsdom(pug.renderFile('views/index.pug'));

	require('angular/angular');
	const React = require('react');
	window.React = React;

	const ReactDOM = require('react-dom');
	window.ReactDOM = ReactDOM;

	const batch = require('../../public/javascripts/experiment/batch');
});
