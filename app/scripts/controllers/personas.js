angular.module('cursoApp').controller('PersonasController',
  ['$log', '$scope', function ($log, $scope) {
    var vm = this;
    vm.listado = [];
    vm.elemento = { id: 1, nombre: 'Pepito', apellidos: 'Grillo', edad: 99 };
    vm.modo = 'edit';
    vm.elemento = {  };
    vm.modo = 'add';

    vm.cancelar = function() {
      alert("Atras");
    }
    vm.enviar = function() {
      alert(JSON.stringify(vm.elemento));
    }
  }]);
