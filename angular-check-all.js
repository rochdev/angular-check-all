angular.module('checkAll', [])
  /**
   * @ngdoc directive
   * @name checkAll
   * @restrict A
   * @element input[type=checkbox]
   * @param {expression} toList
   * @param {expression} byValue
   * @param byKey
   * 
   * @description
   * The `checkAll` directive controls multiple checkboxes.
   */
  .directive('checkAll', ['$parse', function($parse) {
    return {
      restrict: 'A',
      link: function(scope, iElement, iAttrs) {
        var checkAll = $parse(iAttrs.checkAll);
        var byValue = $parse(iAttrs.byValue);
        var toList = $parse(iAttrs.toList);

        scope.$watch(iAttrs.checkAll, sync, true);

        if (iAttrs.toList) {
          scope.$watch(iAttrs.toList, sync, true);
          scope.$watch(iAttrs.checkAll, function(newCollection, oldCollection) {
            if (oldCollection) {
              var list = toList(scope);

              if (list) {
                if (iAttrs.byKey !== undefined) {
                  angular.forEach(oldCollection, function(value, key) {
                    if (newCollection[key] === undefined) {
                      safeRemove(list, key);
                    }
                  });
                } else {
                  var temp = [];

                  angular.forEach(newCollection, function(value, key) {
                    temp.push(getValue(value));
                  });

                  angular.forEach(oldCollection, function(value, key) {
                    if (temp.indexOf(getValue(value)) === -1) {
                      safeRemove(list, getValue(value));
                    }
                  });
                }
              }
            }
          }, true);
        }

        iElement.on('click', function() {
          scope.$apply(function() {
            var collection = checkAll(scope) || [];
            var all;

            if (iAttrs.toList) {
              var list = toList(scope);

              list || toList.assign(scope, []);
              all = !someUnchecked(collection);

              if (all) {
                list.splice(0, list.length);
              } else {
                angular.forEach(collection, function(value, key) {
                  if (iAttrs.byKey !== undefined) {
                    safeAdd(list, key);
                  } else {
                    safeAdd(list, getValue(value));
                  }
                });
              }
            } else {
              all = !someUnchecked(collection);

              angular.forEach(collection, function(value, key) {
                if (iAttrs.byValue !== undefined) {
                  byValue.assign(value, !all);
                } else {
                  collection[key] = !all;
                }
              });
            }
          });
        });

        function sync() {
          var collection = checkAll(scope) || [];
          var someTrue = someChecked(collection);
          var someFalse = someUnchecked(collection);

          iElement.prop('indeterminate', someTrue && someFalse);
          iElement.prop('checked', !someFalse);
        }

        function someChecked(collection) {
          return some(collection, somePredicate);
        }

        function someUnchecked(collection) {
          return some(collection, function(value, key) {
            return !somePredicate(value, key);
          });
        }

        function somePredicate(value, key) {
          if (iAttrs.toList) {
            var list = toList(scope) || [];

            if (iAttrs.byKey !== undefined) {
              return list.indexOf(key) !== -1;
            } else {
              return list.indexOf(getValue(value)) !== -1;
            }
          } else {
            return getValue(value);
          }
        }

        function getValue(value) {
          return iAttrs.byValue !== undefined ? byValue(value) : value;
        };
      }
    };

    function some(collection, predicate) {
      if (angular.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
          if (predicate(collection[i], i)) {
            return true;
          }
        }
      } else {
        for (var key in collection) {
          if (collection.hasOwnProperty(key)) {
            if (predicate(collection[key], key)) {
              return true;
            }
          }
        }
      }

      return false;
    }

    function safeAdd(collection, value) {
      if (collection.indexOf(value) === -1) {
        collection.push(value);
      }
    }

    function safeRemove(collection, value) {
      var index = collection.indexOf(value);

      if (index !== -1) {
        collection.splice(index, 1);
      }
    }
  }]);