'use strict';

/**
 * @ngdoc overview
 * @name cursoApp
 * @description
 * # cursoApp
 *
 * Main module of the application.
 */
var cursoAppModule = angular
  .module('cursoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'myCore'
  ]);
cursoAppModule.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
cursoAppModule.controller('DemoController', [function() {
    var vm = this;
    vm.nombre = 'mundo';
    vm.listado = [
      { id: 1, nombre: 'Madrid'},
      { id: 2, nombre: 'BARCELONA'},
      { id: 3, nombre: 'sevilla'},
      { id: 4, nombre: 'A coruñA'},
    ];
    vm.idProvincia = 2;

    vm.resultado = null;
    vm.visible = true;
    vm.estetica = { error: false, importante: true, urgente: true };

    vm.saluda = function() {
      vm.resultado = 'Hola ' + vm.nombre;
    }
    vm.despide = function() {
      vm.resultado = 'Adios ' + vm.nombre;
    }
    vm.di = function(algo) {
      vm.resultado = 'Dice ' + algo;
    }

    vm.cambia = function() {
      vm.visible = !vm.visible;
      vm.estetica.error = !vm.estetica.error;
      vm.estetica.importante = !vm.estetica.importante;
    }

    vm.calcula = function(a, b) { return a + b; }

    vm.add = function(provincia) {
      var id = vm.listado.lenght == 0 ? 1 : (vm.listado[vm.listado.lenght - 1].id + 1);
      vm.listado.push({id: id, nombre: provincia});
      vm.idProvincia = id;
    }

  }]);
