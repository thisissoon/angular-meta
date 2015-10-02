'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('sn.meta:meta', function (){

  beforeEach(function(){
    browser.get('http://127.0.0.1:8000/');
    browser.waitForAngular();
  });

  // it('should load page with correct page title', function() {
  //   expect(browser.getLocationAbsUrl()).toMatch('/pageone');

  //   var titlePromise = browser.getTitle();
  //   titlePromise.then(function (text){
  //     expect(text).toBe('pageone - Angular Meta Example');
  //   });

  //   browser.setLocation('/pagetwo');
  //   expect(browser.getLocationAbsUrl()).toMatch('/pagetwo');

  //   titlePromise = browser.getTitle();
  //   titlePromise.then(function (text){
  //     expect(text).toBe('pagetwo - Angular Meta Example');
  //   });
  // });

  // it('should load page with correct title without page title specified in route', function() {
  //   browser.setLocation('/pagethree');
  //   expect(browser.getLocationAbsUrl()).toMatch('/pagethree');

  //   var titlePromise = browser.getTitle();
  //   titlePromise.then(function (text){
  //     expect(text).toBe('Angular Meta Example');
  //   });
  // });

});
