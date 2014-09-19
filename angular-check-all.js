angular.module('checkAll', [])
  /**
   * @ngdoc directive
   * @name checkAll
   * @restrict A
   * @element input[type=checkbox]
   * @param {expression} toList
   * @param {expression} byValue
   * @param byKey
   * @param {expression} nestedBy
   * 
   * @description
   * The `checkAll` directive controls multiple checkboxes.
   */
  .directive('checkAll', ['$parse', function($parse) {
    'use strict';

    return {
      restrict: 'A',
      scope: true,
      link: function(scope, iElement, iAttrs) {
        var checkAll = $parse(iAttrs.checkAll);
        var byValue = $parse(iAttrs.byValue);
        var toList = $parse(iAttrs.toList);
        var nestedBy = $parse(iAttrs.nestedBy);

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
                  var temp = getValues(newCollection);

                  angular.forEach(getValues(oldCollection), function(value) {
                    if (temp.indexOf(value) === -1) {
                      safeRemove(list, value);
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
            var check = !every(collection, everyChecked);
            
            if (iAttrs.toList) {
              var list = toList(scope);

              if (!list) {
                list = toList.assign(scope.$parent, []);
              }

              if (!check) {
                if (iAttrs.byKey !== undefined && iAttrs.byValue === undefined) {
                  angular.forEach(collection, function(value, key) {
                    safeRemove(list, key);
                  });
                } else {
                  angular.forEach(getValues(collection), function(value) {
                    safeRemove(list, value);
                  });
                }
              } else {
                angular.forEach(collection, function(value, key) {
                  if (iAttrs.byKey !== undefined && iAttrs.byValue === undefined) {
                    safeAdd(list, key);
                  } else {
                    safeAddValues(list, value);
                  }
                });
              }
            } else {
              angular.forEach(collection, function(value, key) {
                if (iAttrs.byValue !== undefined) {
                  assignAll(value, check);
                } else {
                  toggleAll(collection, key, check);
                }
              });
            }
          });
        });

        function sync() {
          var collection = checkAll(scope) || [];
          var checked = every(collection, everyChecked);

          iElement.prop('indeterminate', !checked && some(collection, someChecked));
          iElement.prop('checked', checked);
        }

        function assignAll(item, value) {
          if (iAttrs.nestedBy) {
            angular.forEach(nestedBy(item), function(subItem) {
              assignAll(subItem, value);
            });
          }

          byValue.assign(item, value);
        }

        function safeAddValues(list, value) {
          safeAdd(list, getValue(value));

          if (iAttrs.nestedBy) {
            angular.forEach(nestedBy(value), function(leaf) {
              safeAddValues(list, leaf);
            });
          }
        }

        function toggleAll(collection, key, value) {
          if (angular.isArray(collection[key]) || angular.isObject(collection[key])) {
            angular.forEach(collection[key], function(item, itemKey) {
              toggleAll(collection[key], itemKey, value);
            });
          } else {
            collection[key] = value;
          }
        }

        function someChecked(value, key) {
          if (iAttrs.byValue !== undefined) {
            if (nestedBy(value)) {
              return isChecked(value, key) || some(nestedBy(value), someChecked);
            }
          } else if (!iAttrs.toList) {
            if (angular.isArray(value) || angular.isObject(value)) {
              return some(value, someChecked);
            }
          }

          return isChecked(value, key);
        }

        function everyChecked(value, key) {
          if (iAttrs.byValue !== undefined) {
            if (nestedBy(value)) {
              return isChecked(value, key) && every(nestedBy(value), everyChecked);
            }
          } else if (!iAttrs.toList) {
            if (angular.isArray(value) || angular.isObject(value)) {
              return every(value, everyChecked);
            }
          }

          return isChecked(value, key);
        }

        function isChecked(value, key) {
          if (iAttrs.toList) {
            var list = toList(scope) || [];

            if (iAttrs.byKey !== undefined) {
              return list.indexOf(key) !== -1;
            } else {
              return list.indexOf(getValue(value)) !== -1;
            }
          } else {
            return getValue(value) === true;
          }
        }

        function some(collection, predicate) {
          if (angular.isArray(collection)) {
            for (var i = 0; i < collection.length; i++) {
              if (predicate(collection[i], i, collection)) {
                return true;
              }
            }
          } else if (angular.isObject(collection)) {
            for (var key in collection) {
              if (collection.hasOwnProperty(key)) {
                if (predicate(collection[key], key, collection)) {
                  return true;
                }
              }
            }
          }

          return false;
        }

        function every(collection, predicate) {
          return !some(collection, function(value, key) {
            return !predicate(value, key);
          });
        }

        function getValue(value) {
          return iAttrs.byValue !== undefined ? byValue(value) : value;
        }

        function getValues(collection) {
          var values = [];

          angular.forEach(collection, function(value) {
            values.push(getValue(value));

            if (nestedBy(value)) {
              Array.prototype.push.apply(values, getValues(nestedBy(value)));
            }
          });

          return values;
        }
      }
    };

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