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

  // describe('site title defined', function() {

  //   it('should render directive with correct title text', function(){
  //     $rootScope.$broadcast('$routeChangeSuccess', {
  //       $$route: {
  //         title: 'foo'
  //       }
  //     })
  //     expect(element.html()).toEqual('foo - My Site Name');

  //     $rootScope.$broadcast('$routeChangeSuccess', {
  //       $$route: {
  //         title: undefined
  //       }
  //     })
  //     expect(element.html()).toEqual('My Site Name');
  //   });

  //   it('should render directive with error title text', function(){
  //     $rootScope.$broadcast('$routeChangeError')
  //     expect(element.html()).toEqual(errorText + ' - My Site Name');
  //   });
  });
});
