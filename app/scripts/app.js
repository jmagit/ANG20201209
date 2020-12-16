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
    .when('/demo', {
      templateUrl: 'views/demo.html',
      controller: 'DemoController',
      controllerAs: 'vm'
    })
    .when('/calculadora', {
      templateUrl: 'views/calculadora.html',
      controller: 'CalculadoraController',
      controllerAs: 'ctrl'
    })
    .when('/calc', {
      templateUrl: 'views/calculadora.en.html',
      controller: 'CalculadoraController',
      controllerAs: 'ctrl'
    })
    .when('/personas', {
      templateUrl: 'views/personas/listado.html',
      controller: 'PersonasController',
      controllerAs: 'vm'
    })
    .when('/personas/add', {
      templateUrl: 'views/personas/formulario.html',
      controller: 'PersonasController',
      controllerAs: 'vm'
    })
    .when('/personas/:id/edit', {
      templateUrl: 'views/personas/formulario.html',
      controller: 'PersonasController',
      controllerAs: 'vm'
    })
    .when('/personas/:id', {
      templateUrl: 'views/personas/detalle.html',
      controller: 'PersonasController',
      controllerAs: 'vm'
    })
    .when('/personas/:id/:kk*', {
      templateUrl: 'views/personas/detalle.html',
      controller: 'PersonasController',
      controllerAs: 'vm'
    })
    .when('/libros', {
      templateUrl: 'views/libros/listado.html',
      controller: 'LibrosController',
      controllerAs: 'vm'
    })
    .when('/libros/add', {
      templateUrl: 'views/libros/formulario.html',
      controller: 'LibrosController',
      controllerAs: 'vm'
    })
    .when('/libros/:id/edit', {
      templateUrl: 'views/libros/formulario.html',
      controller: 'LibrosController',
      controllerAs: 'vm'
    })
    .when('/libros/:id', {
      templateUrl: 'views/libros/detalle.html',
      controller: 'LibrosController',
      controllerAs: 'vm'
    })
    .when('/libros/:id/:kk*', {
      templateUrl: 'views/libros/detalle.html',
      controller: 'LibrosController',
      controllerAs: 'vm'
    })
    .otherwise({
      redirectTo: '/'
    });
});
cursoAppModule.constant('version', 1);
cursoAppModule.constant('URLApi', 'http://localhost:4321/api/');
cursoAppModule.factory('TitleService', [function () {
  var titulo = 'Curso de AngularJS';
  return {
    Titulo: function (newName) {
      return arguments.length ? (titulo = newName) : titulo;
    }
  };
}]);
cursoAppModule.factory('NotificationService', [function () {
  var listado = [];
  return {
    add: function (msg) {
      var id = listado.length == 0 ? 1 : (listado[listado.length - 1].id + 1);
      listado.push({ id: id, mensaje: msg });
    },
    remove: function (index) {
      listado.splice(index, 1);
    },
    clear: function () {
      listado = [];
    },
    hayNotificaciones: function () { return listado.length > 0; },
    notificaciones: function () { return Object.assign([], listado); }
  };
}]);

cursoAppModule.controller('ApplicationController', ['TitleService', 'NotificationService', function (TitleService, notify) {
  var vm = this;

  vm.dameTitulo = function () { return TitleService.Titulo() }
  vm.Notify = notify;
}]);
cursoAppModule.controller('DemoController', ['TitleService', 'NotificationService', function (TitleService, notify) {
  var vm = this;
  vm.nombre = TitleService.Titulo();
  vm.listado = [
    { id: 1, nombre: 'Madrid' },
    { id: 2, nombre: 'BARCELONA' },
    { id: 3, nombre: 'sevilla' },
    { id: 4, nombre: 'A coruñA' },
  ];
  vm.idProvincia = 2;
  TitleService.Titulo('Soy una demo');

  vm.resultado = null;
  vm.visible = true;
  vm.estetica = { error: false, importante: true, urgente: true };

  vm.saluda = function () {
    vm.resultado = 'Hola ' + vm.nombre;
    notify.add(vm.resultado);
  }
  vm.despide = function () {
    vm.resultado = 'Adios ' + vm.nombre;
  }
  vm.di = function (algo) {
    vm.resultado = 'Dice ' + algo;
  }

  vm.cambia = function () {
    vm.visible = !vm.visible;
    vm.estetica.error = !vm.estetica.error;
    vm.estetica.importante = !vm.estetica.importante;
  }

  vm.calcula = function (a, b) { return a + b; }

  vm.add = function (provincia) {
    var id = vm.listado.length == 0 ? 1 : (vm.listado[vm.listado.length - 1].id + 1);
    vm.listado.push({ id: id, nombre: provincia });
    vm.idProvincia = id;
  }

}]);
