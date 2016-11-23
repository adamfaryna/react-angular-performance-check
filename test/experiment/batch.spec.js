const pug = require('pug');
const jsdom = require('jsdom-global');
const expect = require('chai').expect;

jsdom(pug.renderFile('views/index.pug'));

require('../../public/javascripts/index');

require('angular/angular');
// const inject = window.angular.mock.inject;
// const module = window.angular.mock.module;

const React = require('react');
window.React = React;

const ReactDOM = require('react-dom');
window.ReactDOM = ReactDOM;

// const server = require('../../app');

describe('batch', () => {
	// let batch;

 //  before(() => {
 //  	module('angularApp');
 //  	inject(($templateCache) => {
	//   	$templateCache.put('partials/record.directive.pug', pug.renderFile('views/partials/record.directive.pug'));
	// 		batch = require('../../public/javascripts/experiment/batch');
	//   	// server.listen(3000);
	//   })();
 //  });

 //  before(() => {
 //  	module('angularApp');
 //  	inject(($templateCache) => {
	//   	$templateCache.put('partials/record.directive.pug', pug.renderFile('views/partials/record.directive.pug'));
	// 		batch = require('../../public/javascripts/experiment/batch');
	//   	// server.listen(3000);
	//   })();
 //  });

  // before(() => {
  	
  // });

  // after(() => {
		// server.close();
  // });

	describe('run method', () => {
		it('should show progress bar at start');
		it('should show raport element after show progress bar');
		it('should clean current raport at start after show raport element');
		it('should clean every experiment before run it');
		it('should run all experiments after cleaning current raport');
		it('should print raport for all experiments after each experiment');
		it('should hide progressBar after all printing last raport');
	});

	describe('showReport method', () => {
		it('should show raport element');
	});

	describe('printRaport method', () => {
		it('should print raport for single experiment');
	});

	describe('cleanReport method', () => {
		it.skip('should clean raport element', function() {
			return batch.run()
				.then(batch.clean)
				.then(() => {
					var raportBodyCreateRaportRows = raport.querySelector('#create_raport_table tbody tr');
					var raportBodyAppendRaportRows = raport.querySelector('#append_raport_table tbody tr');
					expect(raportBodyCreateRaportRows.length).to.be.equal(0);
					expect(raportBodyAppendRaportRows.length).to.be.equal(0);
				});
		});
	});
});
