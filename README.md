# Angular Meta

[![Build Status](https://travis-ci.org/thisissoon/angular-meta.svg?branch=master)](https://travis-ci.org/thisissoon/angular-meta)
[![Coverage Status](https://coveralls.io/repos/thisissoon/angular-meta/badge.svg)](https://coveralls.io/r/thisissoon/angular-meta)

<!-- [![Sauce Test Status](https://saucelabs.com/browser-matrix/angular-meta.svg)](https://saucelabs.com/u/angular-meta) -->

Angular Meta dyamically updates the document meta tags when navigating views
defined in `ngRoute`'s `$routeProvider`. Simply define the meta data of a
page in your `$routeProvider` config using the `meta` key and pass an object
with key/pair values that match your meta content.

## Install

You can install this module using [bower][bower] like so:

```
bower install angular-meta-sn --save
```

Add the angular-meta library file to your `index.html file` like so:

```html
<script src="path/to/angular-meta-sn/dist/angular-meta.min.js"></script>
```

Then add the module to your angular app:

```javascript
angular.module('myApp', ['sn.meta'])
```

## Example Usage

In your index file simply add your meta elements as normal:

```html
<meta name="description" content="Generic site description">
```

Then in your angular module config use the `meta` key in your `$routeProvider` config

```javascript
  $routeProvider
    .when('/pageone', {
      controller: 'PageOneCtrl'
      meta: {
        description: 'Page one description'
      },
      templateUrl: 'partials/pageone.html'
    })
    .when('/pagetwo', {
      controller: 'PageTwoCtrl'
      meta: {
        description: 'Page two description'
      },
      templateUrl: 'partials/pagetwo.html'
    })
```

You can also configure a page's meta data in your controller by using the snMeta service
in case the data you need is not available in app config:

```javascript
angular.module('myApp', ['sn.meta'])
  .controller('MyCtrl',[
    'snTitle',
    function (snTitle){
      snTitle.setPageTitle('My Page');
    }
  ])
```


This project structure is based on the [angular-seed](https://github.com/angular/angular-seed) application skeleton for a typical [AngularJS](http://angularjs.org/) web app.

The project is preconfigured to install the Angular framework and a bunch of development and testing tools for instant web development gratification.


## Getting Started

To get you started you can simply clone the repository and install the dependencies:

### Clone the Angular Meta repository

Clone the angular-meta repository using [git][git]:

```
cd path/to/parent/directory
git clone git@github.com:thisissoon/angular-meta.git
cd angular-meta
```


### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code. The tools help us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].
* We run regular tasks like code minification via `grunt`, a [javascript task runner][grunt].


The following tools require super user privileges so you will need to install them separately like so:

```
sudo npm install -g bower 
sudo npm install -g grunt-cli
```

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/components` - contains the angular framework files and other libraries

### Install Libraries

We install our frontend libraries via `bower`, a [client-side code package manager][bower].

All frontend depenancies such as angular will be installed when running `npm install`. To manually install all dependencies run:

```
bower install
```

To install a new library such as bootstrap we can simply do:

```
bower install bootstrap --save
```

And this will download the bootstrap package from bower and also update the `bower.json` file to include that package. You will then need to add the script tag to `app/index.html` like so:

```html
<script src="path/to/bootstrap.js"></script>
```

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
grunt server
```

Now browse to the app at `http://localhost:8000/app/`.

If you are doing any javascript development you can instead run:

```
grunt serverjs
```

To run tests as well every time a javascript file is updated

To watch all files run:

```
grunt serverall
```

To run tests or compile less to css when the relevent files are updated. 

### Running the build script

To create a build to deploy for a production environment simply run: 

```
grunt build
```

The build files will then be in the `dist/` directory.

### Creating a new release

To create a new release simply run: 

```
grunt release --setversion X.Y.Z
```

Where `X.Y.Z` is the new version number. This will update `package.json` 
and `bower.json` with the new version number and then run `grunt build` before
committing the changes to git.

The build files will then be in the `dist/` directory.


## Directory Layout

```

app/                    --> all of the files to be used in production
  components/           --> all of our javascript libraries (installed using bower)
  index.html            --> app layout file (the main html template file of the app)
  js/                   --> javascript files
    {module}.js            --> angular module initialisation
tests/                  --> test config and source files
  e2e/                  --> end-to-end specs
    specs/              
      scenarios.js
    protractor.conf.js  --> config file for running e2e tests with Protractor
  unit/                 --> unit level specs/tests
    {module}.js         --> module test

```

## Testing

There are two kinds of tests in the angular-seed application: Unit tests and End to End tests.

### Running Unit Tests

The angular-seed app comes preconfigured with unit tests. These are written in
[Jasmine][jasmine], which we run with [Grunt][grunt].

* the configuration is found in `Gruntfile.js`
* the unit tests are found in `tests/unit/`.

The easiest way to run the unit tests is to do:

```
grunt test
```

This script will start the Jasmine test runner to execute the unit tests. You can also run:

```
grunt serverjs
```

Where the grunt watch command will sit and watch the source and test files for changes and then re-run the tests whenever any of them change.
This is the recommended strategy; if you unit tests are being run every time you save a file then
you receive instant feedback on any changes that break the expected code functionality.


### End to end testing

The angular-seed app comes with end-to-end tests, again written in [Jasmine][jasmine]. These tests
are run with the [Protractor][protractor] End-to-End test runner.  It uses native events and has
special features for Angular applications.

* the configuration is found at `tests/e2e/protractor.conf.js`
* the end-to-end tests are found in `tests/e2e/specs/`

Protractor simulates interaction with our web app and verifies that the application responds
correctly. Therefore, our web server needs to be serving up the application, so that Protractor
can interact with it. To run end to end tests we first need to install protractor with global permissions. You may need to run this command with superuser privileges:

```
npm install -g protractor
```

Once you have ensured that the development web server hosting our application is up and running
and WebDriver is updated, you can run the end-to-end tests using the supplied grunt task:

```
grunt e2e
```

Behind the scenes this will also run `webdriver-manager update && webdriver-manager start`. This will download and install the latest version of the stand-alone WebDriver tool and start the Selenium web server. This script will execute the end-to-end tests against the application being hosted on the
development server. 


## Contact

For more information on AngularJS please check out http://angularjs.org/

[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[grunt]: http://gruntjs.com/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://pivotal.github.com/jasmine/
[karma]: http://karma-runner.github.io
[travis]: https://travis-ci.org/
[http-server]: https://github.com/nodeapps/http-server
