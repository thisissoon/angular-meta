'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('sn.meta:meta', function (){

  beforeEach(function(){
    browser.get('http://127.0.0.1:8000/');
    browser.waitForAngular();
  });

  it('should load page with correct page title', function() {
    expect(browser.getLocationAbsUrl()).toMatch('/pageone');

    var getAttribute = element(by.css("meta[name=\"description\"]")).getAttribute('content');
    getAttribute.then(function (text){
      expect(text).toBe('Page one description');
    });

    browser.setLocation('/pagetwo');
    expect(browser.getLocationAbsUrl()).toMatch('/pagetwo');

    getAttribute = element(by.css("meta[name=\"description\"]")).getAttribute('content');
    getAttribute.then(function (text){
      expect(text).toBe('Page two description');
    });
  });

  it('should clear meta data if none is specified for route', function() {
    browser.setLocation('/pagethree');
    expect(browser.getLocationAbsUrl()).toMatch('/pagethree');

    var getAttribute = element(by.css("meta[name=\"description\"]")).getAttribute('content');
    getAttribute.then(function (text){
      expect(text).toBe('');
    });
  });

});
