const pug = require('pug');
const jsdom = require('jsdom-global');
const expect = require('chai').expect;

jsdom(pug.renderFile('views/index.pug'));

require('angular/angular');
require('angular-mocks');

const angular = window.angular;
const inject = angular.mock.inject;

const angularExperiment = require('../../../public/javascripts/experiment/framework/angularExperiment');

describe('angularExperiment', () => {
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
		it('should emit clean event after finished');
	})

	describe('MainController', () => {
		let scope, controller;

		beforeEach(angular.module('angularApp'));
		// beforeEach(inject())
		
		describe('clean method', () => {
			it('should clean controller variables state');
		});

		describe('runCreate method', () => {
			it('should clean state before running');
			it('should save current timestamp');
			it('should set data records');
			it('should emit event "runCreateHelpListener"');
		});

		describe('runAppend method', () => {
			it('should call runCreate method');
			it('should save current timestamp');
			it('should set data records to double amount');
		});

		describe('$doCheck method', () => {
			it('should emit finished run create event when finished rendering after create run');
			it('should emit finished run append event when finished rendering after append run');
		});
	});
});
