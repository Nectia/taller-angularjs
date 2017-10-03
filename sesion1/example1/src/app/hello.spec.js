var angular = require('angular');
require('angular-mocks');
var hello = require('./hello');

describe('hello component', function () {
  beforeEach(function () {
    angular
      .module('fountainHello', ['app/hello.html'])
      .component('fountainHello', hello);
    angular.mock.module('fountainHello');
  });
  it('Titulo debe decir Hola!', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<fountain-hello>Loading...</fountain-hello>')($rootScope);
    $rootScope.$digest();
    var h1 = element.find('h1');
    expect(h1.html()).toEqual('Hola!');
  }));

  it('Titulo debe cambiar a Hola Nombre!', angular.mock.inject(function ($componentController) {
    var bindings = {
      name: 'Nombre'
    };
    var component = $componentController('fountainHello', {}, bindings);
    component.updateName();
    expect(component.hello).toEqual('Hola Nombre!');
  }));
});
