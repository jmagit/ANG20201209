var myCore = angular.module('myCore', []);

myCore.filter("capitalize", function () {
  return function (s) {
    if (typeof (s) === "string") {
      return s.charAt(0).toUpperCase() +
        s.substring(1, s.length).toLowerCase();
    }
    return s;
  };
});
myCore.filter("initcap", function () {
  return function (s) {
      if (typeof (s) === "string") {
          return s.replace(/[^\s]+/g,
                  function (cad) {
                      return cad.charAt(0).toUpperCase() +
                          cad.slice(1).toLowerCase();
                  });
      }
      return s;
  };
});

myCore.filter("toComaDecimal", function() {
  return function(s) {
    if (typeof(s) === "number") {
        s = s.toString();
    }
    if (typeof(s) === "string") {
        return s.replace(".", ",");
    }
    return s;
  };
});

myCore.directive('valInteger', function() {
  return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
          ctrl.$validators.valInteger = function(modelValue, viewValue) {
              if (ctrl.$isEmpty(modelValue)) {
                  // tratamos los modelos vacíos como correctos
                  return true;
              }
              return /^\-?\d+$/.test(viewValue);
          };
      }
  };
});

myCore.directive('valUpperCase', function() {
  return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
          ctrl.$validators.valUpperCase = function(modelValue, viewValue) {
              if (ctrl.$isEmpty(modelValue)) {
                  // tratamos los modelos vacíos como correctos
                  return true;
              }
              return viewValue == viewValue.toUpperCase();
          };
      }
  };
});
