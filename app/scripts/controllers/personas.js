angular.module('cursoApp').factory('PersonasDAO', ['$http', 'URLApi', function ($http, URLApi) {
  var baseUrl = URLApi + 'personas';
  var config = {};
  return {
    query: function () {
      return $http.get(baseUrl, config);
    },
    get: function (id) {
      return $http.get(baseUrl + '/' + id, config);
    },
    add: function (item) {
      return $http.post(baseUrl, item, config);
    },
    change: function (id, item) {
      return $http.put(baseUrl + '/' + id, item, config);
    },
    remove: function (id) {
      return $http.delete(baseUrl + '/' + id, config);
    }
  };
}]);

angular.module('cursoApp').controller('PersonasController',
  ['$log', '$scope', '$window', '$routeParams', '$location', 'PersonasDAO', 'NotificationService',
    function ($log, $scope, $window, $routeParams, $location, dao, notify) {
      var vm = this;
      var idOriginal = null;
      var urlListado = '/personas';

      vm.listado = [];
      vm.elemento = {};
      vm.modo = 'list';

      vm.list = function () {
        dao.query().then(
          function (resp) {
            vm.listado = resp.data;
            vm.modo = 'list';
          },
          function (err) {
            notify.add(err.statusText);
          }
        );
      }

      vm.add = function () {
        vm.elemento = {};
        vm.modo = 'add';
      }
      vm.edit = function (id) {
        dao.get(id).then(
          function (resp) {
            vm.elemento = resp.data;
            vm.modo = 'edit';
            idOriginal = id;
          },
          function (err) {
            notify.add(err.statusText);
          }
        );
      }
      vm.view = function (id) {
        dao.get(id).then(
          function (resp) {
            vm.elemento = resp.data;
            vm.modo = 'view';
          },
          function (err) {
            notify.add(err.statusText);
          }
        );
      }
      vm.delete = function (id) {
        if (!$window.confirm('¿Seguro?')) return;
        dao.remove(id).then(
          function (resp) {
            vm.list();
          },
          function (err) {
            notify.add(err.statusText);
          }
        );

      }
      vm.cancelar = function () {
        $location.url(urlListado);
      }
      vm.enviar = function () {
        switch (vm.modo) {
          case 'add':
            dao.add(vm.elemento).then(
              function (resp) {
                vm.cancelar();
              },
              function (err) {
                notify.add(err.statusText);
              }
            );
            break;
          case 'edit':
            dao.change(idOriginal, vm.elemento).then(
              function (resp) {
                vm.cancelar();
              },
              function (err) {
                notify.add(err.statusText);
              }
            );
            break;
          case 'view':
            vm.cancelar();
            break;
        }
      }

      if($routeParams.id) {
        if($location.url().endsWith('/edit'))
          vm.edit($routeParams.id);
        else
          vm.view($routeParams.id);
      } else {
        if($location.url().endsWith('/add'))
          vm.add();
        else
          vm.list();
      }
    }]);
