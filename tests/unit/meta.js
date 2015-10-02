'use strict';

describe('sn.meta:meta directive', function() {
  var element, $scope, $location, $rootScope, snTitle;

  beforeEach(module('sn.meta'));

  beforeEach(inject(function (_$rootScope_, $compile, $injector) {
    $rootScope = _$rootScope_;

    $scope = $rootScope.$new();

    $location = $injector.get('$location');

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
    });

  });
});
