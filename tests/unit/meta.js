'use strict';

describe('sn.meta:meta directive', function() {
  var element, $scope, $rootScope, snTitle;

  beforeEach(module('sn.meta'));

  beforeEach(inject(function (_$rootScope_, $compile, $injector) {
    $rootScope = _$rootScope_;

    $scope = $rootScope.$new();

    element = '<meta name="description" content="Page description. No longer than 155 characters." />';

    element = $compile(element)($scope);
    $scope.$digest();

  }));

  describe('meta data defined', function() {

    it('should render directive with correct meta data', function(){
      $rootScope.$broadcast("$routeChangeSuccess", {
        $$route: {
          meta: {
            description: 'pageone description'
          }
        }
      })
      expect(element.attr('content')).toEqual('pageone description');

    });

    it('should clear meta data on route change error', function(){
      $rootScope.$broadcast("$routeChangeError");
      expect(element.attr('content')).toEqual('');
    });

    it('should NOT update meta if meta tag isn\'t defined in route', function(){
      $rootScope.$broadcast("$routeChangeSuccess", {
        $$route: {
          meta: {
            another_tag: 'some content'
          }
        }
      })
      expect(element.attr('content')).not.toEqual('some content');
      expect(element.attr('content')).not.toEqual('');
      expect(element.attr('content')).toEqual('Page description. No longer than 155 characters.');
    });
  });

  describe('property as key', function() {

    beforeEach(inject(function (_$rootScope_, $compile, $injector) {

      element = '<meta property="description" content="Page description. No longer than 155 characters." />';

      element = $compile(element)($scope);
      $scope.$digest();

    }));

    it('should render directive with correct meta data', function(){
      $rootScope.$broadcast("$routeChangeSuccess", {
        $$route: {
          meta: {
            description: 'pageone description'
          }
        }
      })
      expect(element.attr('content')).toEqual('pageone description');

    });

  });

  describe('itemprop as key', function() {

    beforeEach(inject(function (_$rootScope_, $compile, $injector) {

      element = '<meta itemprop="description" content="Page description. No longer than 155 characters." />';

      element = $compile(element)($scope);
      $scope.$digest();

    }));

    it('should render directive with correct meta data', function(){
      $rootScope.$broadcast("$routeChangeSuccess", {
        $$route: {
          meta: {
            description: 'pageone description'
          }
        }
      })
      expect(element.attr('content')).toEqual('pageone description');

    });

  });
});

describe('sn.meta:snMeta service', function() {
  var element, $scope, $rootScope, snMeta, eventName;

  beforeEach(module('sn.meta'));

  beforeEach(inject(function (_$rootScope_, $compile, $injector) {
    $rootScope = _$rootScope_;

    $scope = $rootScope.$new();

    snMeta = $injector.get('snMeta');

    eventName = $injector.get('snMetaEvents').SET_META;

    element = '<meta name="description" content="Page description. No longer than 155 characters." />';

    element = $compile(element)($scope);
    $scope.$digest();

  }));

  describe('set meta using service', function() {

    it('should update meta element content attribute', function(){
      var meta = { description: 'pageone description' };
      var spy = spyOn($rootScope, '$broadcast').and.callThrough();

      snMeta.setMetaContent(meta);

      expect(spy).toHaveBeenCalledWith(eventName, meta);
      expect(element.attr('content')).toEqual('pageone description');
    });

    it('should NOT update meta element content attribute', function(){
      var meta = { someTag: 'tag content' };
      var spy = spyOn($rootScope, '$broadcast').and.callThrough();

      snMeta.setMetaContent(meta);

      expect(spy).toHaveBeenCalledWith(eventName, meta);
      expect(element.attr('content')).not.toEqual('tag content');
    });

  });
});
