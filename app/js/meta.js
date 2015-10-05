'use strict';
/**
 * Inspired by angular title {@link https://github.com/thisissoon/angular-title}
 * Angular Meta dynamically updates the document meta data when navigating views
 * defined in `ngRoute`'s `$routeProvider`. Simply define the meta data of the
 * page in your `$routeProvider` config using the `meta` key.
 *
 * Add an object with the key pair values of your meta tags and the content
 * will be applied to the relevent meta tag e.g. if your object contained this:
 * `{ description: 'My page description' }` then the following element:
 * `<meta name="description" content="Generic site description">` would become:
 * `<meta name="description" content="My page description">`.
 *
 * @example
  $routeProvider
    .when('/pageone', {
      controller: 'pageoneCtrl'
      meta: {
        description: 'Page one description'
      },
      templateUrl: 'partials/pageone.html'
    })
    .when('/pagetwo', {
      controller: 'pagetwoCtrl'
      meta: {
        description: 'Page two description'
      },
      templateUrl: 'partials/pagetwo.html'
    })
 * @main   sn.meta
 * @module sn.meta
 * @author SOON_
 */
angular.module('sn.meta', ['ngRoute'])
/**
 * @constant
 * @property snMetaEvents
 * @type     {Object}
 */
.constant('snMetaEvents', {
  SET_META: 'sn:meta:setMeta',
  ROUTE_CHANGE_SUCCESS: '$routeChangeSuccess',
  ROUTE_CHANGE_ERROR: '$routeChangeError'
})
/**
 * Meta element directive which updates it's content attribute to
 * be relevent to the current page.
 * @example
    <meta name="description" content="">
 * @class  meta
 * @module sn.meta
 * @author SOON_
 */
.directive('meta', [
  '$rootScope',
  'snMetaEvents',
  /**
   * @constructor
   * @param {Service} $rootScope
   * @param {String}  snMetaEvents
   */
  function ($rootScope, snMetaEvents) {
    return {
      restrict: 'E',
      scope: {},
      link: function ($scope, $element, $attrs) {

        /**
         * @method setMeta
         * @param  {event}  $event - '$routeChangeSuccess' event from ngRoute service
         * @param  {Object} meta   - The requested route object
         */
        var setMeta = function setMeta(event, meta){
          if ( meta[$attrs.name] ) {
            $element.attr('content', meta[$attrs.name]);
          }
        };

        /**
         * Update the content of the title element to the value
         * of the title key in the object of the current route
         * @method onRouteChangeSuccess
         * @param {event}  $event  - '$routeChangeSuccess' event from `ngRoute` service
         * @param {Object} current - The requested route object
         */
        var onRouteChangeSuccess = function onRouteChangeSuccess($event, current){
          var content = '';

          if (current &&
              current.$$route &&
              current.$$route.meta &&
              current.$$route.meta[$attrs.name]
          ) {
            content = current.$$route.meta[$attrs.name];
          }

          $element.attr('content', content);
        };

        /**
         * Update the content of the title element to the value
         * of ROUTE_CHANGE_ERROR_TITLE constant when $routeChangeError
         * event is triggered.
         * @method onRouteChangeError
         */
        var onRouteChangeError = function onRouteChangeError(){
          $element.attr('content', '');
        };

        $rootScope.$on(snMetaEvents.SET_META, setMeta);
        $rootScope.$on(snMetaEvents.ROUTE_CHANGE_SUCCESS, onRouteChangeSuccess);
        $rootScope.$on(snMetaEvents.ROUTE_CHANGE_ERROR, onRouteChangeError);

      }
    };
  }
])
/**
 * Service that sets the meta tags of the document
 * @example
    angular.module('myApp', ['sn.meta'])
      .controller('MyCtrl',[
        'snTitle',
        function (snTitle){
          snTitle.setPageTitle('My Page');
        }
      ])
 * @class  snMeta
 * @module sn.meta
 * @author SOON_
 */
.provider('snMeta', function() {
  /**
   * @property $get
   * @type     {Array}
   */
  this.$get = [
    '$rootScope',
    'snMetaEvents',
    function ($rootScope, snMetaEvents) {
      return {
        /**
         * Set the content attribute of a meta element directive.
         * Broadcasts an event which is being listen to by meta directives
         * @method setMetaContent
         * @param  {Object} meta - Key/pair values where the key should match the
         *                         name attribute of the meta data to update
         */
        setMetaContent: function setMetaContent(meta){
          $rootScope.$broadcast(snMetaEvents.SET_META, meta);
        }
      };
    }
  ];
});
