// TODO: write tests
describe('checkAll', function() {
  var $compile;
  var $element;
  var $scope;
      
  beforeEach(module('checkAll'));
  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
  }));

  describe('when used without any option', function() {
    beforeEach(function() {
      $element = angular.element(
        '<input type="checkbox" check-all="source">'
      );
    });

    describe('with an array source', function() {
      beforeEach(function() {
        $scope.source = [false, false];
        $compile($element)($scope);
        $scope.$digest();
      });

      test(0, 1);
    });

    describe('with an object source', function() {
      beforeEach(function() {
        $scope.source = {
          a: false,
          b: false
        };
        $compile($element)($scope);
        $scope.$digest();
      });

      test('a', 'b');
    });

    describe('with a nested source', function() {
      beforeEach(function() {
        $scope.source = [false, {
          a: false,
          b: [false, false]
        }];
        $compile($element)($scope);
        $scope.$digest();
      });

      it('should check all when clicked and none is checked', function() {
        $element.triggerHandler('click');

        expect($scope.source[0]).toBe(true);
        expect($scope.source[1].a).toBe(true);
        expect($scope.source[1].b[0]).toBe(true);
        expect($scope.source[1].b[1]).toBe(true);
      });

      it('should check all when clicked and some are checked', function() {
        $scope.source[0] = true;
        $scope.source[1].a = true;
        $scope.source[1].b[0] = true;
        $element.triggerHandler('click');

        expect($scope.source[0]).toBe(true);
        expect($scope.source[1].a).toBe(true);
        expect($scope.source[1].b[0]).toBe(true);
        expect($scope.source[1].b[1]).toBe(true);
      });

      it('should uncheck all when clicked and all are checked', function() {
        $scope.source[0] = true;
        $scope.source[1].a = true;
        $scope.source[1].b[0] = $scope.source[1].b[1] = true;
        $element.triggerHandler('click');

        expect($scope.source[0]).toBe(false);
        expect($scope.source[1].a).toBe(false);
        expect($scope.source[1].b[0]).toBe(false);
        expect($scope.source[1].b[1]).toBe(false);
      });

      it('should get checked when all are checked', function() {
        $scope.$apply(function() {
          $scope.source[0] = true;
          $scope.source[1].a = true;
          $scope.source[1].b[0] = $scope.source[1].b[1] = true;
        });

        expect($element.prop('checked')).toBe(true);
        expect($element.prop('indeterminate')).toBe(false);
      });

      it('should get indeterminate when some are checked', function() {
        $scope.$apply(function() {
          $scope.source[1].b[0] = true;
        });

        expect($element.prop('checked')).toBe(false);
        expect($element.prop('indeterminate')).toBe(true);
      });

      it('should get unchecked when all are unchecked', function() {
        expect($element.prop('checked')).toBe(false);
        expect($element.prop('indeterminate')).toBe(false);
      });
    });

    function test(a, b) {
      it('should check all when clicked and none is checked', function() {
        $element.triggerHandler('click');

        expect($scope.source[a]).toBe(true);
        expect($scope.source[b]).toBe(true);
      });

      it('should check all when clicked and some are checked', function() {
        $scope.source[a] = true;
        $element.triggerHandler('click');

        expect($scope.source[a]).toBe(true);
        expect($scope.source[b]).toBe(true);
      });

      it('should uncheck all when clicked and all are checked', function() {
        $scope.source[a] = $scope.source[b] = true;
        $element.triggerHandler('click');

        expect($scope.source[a]).toBe(false);
        expect($scope.source[b]).toBe(false);
      });

      it('should get checked when all are checked', function() {
        $scope.$apply(function() {
          $scope.source[a] = $scope.source[b] = true;
        });

        expect($element.prop('checked')).toBe(true);
        expect($element.prop('indeterminate')).toBe(false);
      });

      it('should get indeterminate when some are checked', function() {
        $scope.$apply(function() {
          $scope.source[a] = true;
        });

        expect($element.prop('checked')).toBe(false);
        expect($element.prop('indeterminate')).toBe(true);
      });

      it('should get unchecked when all are unchecked', function() {
        expect($element.prop('checked')).toBe(false);
        expect($element.prop('indeterminate')).toBe(false);
      });
    }
  });

  describe('when used by value', function() {
    beforeEach(function() {
      $element = angular.element(
        '<input type="checkbox" check-all="source" by-value="test">'
      );
    });

    describe('with an array source', function() {
      beforeEach(function() {
        $scope.source = [
          { test: false },
          { test: false }
        ];
        $compile($element)($scope);
        $scope.$digest();
      });

      test(0, 1);
    });

    describe('with an object source', function() {
      beforeEach(function() {
        $scope.source = {
          a: { test: false },
          b: { test: false }
        };
        $compile($element)($scope);
        $scope.$digest();
      });

      test('a', 'b');
    });

    function test(a, b) {
      it('should check all when clicked and none is checked', function() {
        $element.triggerHandler('click');

        expect($scope.source[a].test).toBe(true);
        expect($scope.source[b].test).toBe(true);
      });

      it('should check all when clicked and some are checked', function() {
        $scope.source[a].test = true;
        $element.triggerHandler('click');

        expect($scope.source[a].test).toBe(true);
        expect($scope.source[b].test).toBe(true);
      });

      it('should uncheck all when clicked and all are checked', function() {
        $scope.source[a].test = $scope.source[b].test = true;
        $element.triggerHandler('click');

        expect($scope.source[a].test).toBe(false);
        expect($scope.source[b].test).toBe(false);
      });

      it('should get checked when all are checked', function() {
        $scope.$apply(function() {
          $scope.source[a].test = $scope.source[b].test = true;
        });

        expect($element.prop('checked')).toBe(true);
        expect($element.prop('indeterminate')).toBe(false);
      });

      it('should get indeterminate when some are checked', function() {
        $scope.$apply(function() {
          $scope.source[a].test = true;
        });

        expect($element.prop('checked')).toBe(false);
        expect($element.prop('indeterminate')).toBe(true);
      });

      it('should get unchecked when all are unchecked', function() {
        expect($element.prop('checked')).toBe(false);
        expect($element.prop('indeterminate')).toBe(false);
      });
    }
  });

  describe('when used by value', function() {
    beforeEach(function() {
      $element = angular.element(
        '<input type="checkbox"' +
              ' check-all="source"' +
              ' by-value="value"' +
              ' nested-by="children">'
      );
    });

    describe('with a nested source', function() {
      beforeEach(function() {
        $scope.source = [
          { value: false },
          {
            value: false,
            children: {
              a: { value: false },
              b: {
                value: false,
                children: [
                  { value: false },
                  { value: false }
                ]
              }
            }
          }
        ];
        $compile($element)($scope);
        $scope.$digest();
      });

      it('should check all when clicked and none is checked', function() {
        $element.triggerHandler('click');

        expect($scope.source[0].value).toBe(true);
        expect($scope.source[1].value).toBe(true);
        expect($scope.source[1].children.a.value).toBe(true);
        expect($scope.source[1].children.b.value).toBe(true);
        expect($scope.source[1].children.b.children[0].value).toBe(true);
        expect($scope.source[1].children.b.children[1].value).toBe(true);
      });

      it('should check all when clicked and some are checked', function() {
        $scope.source[1].children.b.children[1].value = true;

        $element.triggerHandler('click');

        expect($scope.source[0].value).toBe(true);
        expect($scope.source[1].value).toBe(true);
        expect($scope.source[1].children.a.value).toBe(true);
        expect($scope.source[1].children.b.value).toBe(true);
        expect($scope.source[1].children.b.children[0].value).toBe(true);
        expect($scope.source[1].children.b.children[1].value).toBe(true);
      });

      it('should uncheck all when clicked and all are checked', function() {
        $scope.source[0].value = true;
        $scope.source[1].value = true;
        $scope.source[1].children.a.value = true;
        $scope.source[1].children.b.value = true;
        $scope.source[1].children.b.children[0].value = true;
        $scope.source[1].children.b.children[1].value = true;

        $element.triggerHandler('click');

        expect($scope.source[0].value).toBe(false);
        expect($scope.source[1].value).toBe(false);
        expect($scope.source[1].children.a.value).toBe(false);
        expect($scope.source[1].children.b.value).toBe(false);
        expect($scope.source[1].children.b.children[0].value).toBe(false);
        expect($scope.source[1].children.b.children[1].value).toBe(false);
      });

      it('should get checked when all are checked', function() {
        $scope.$apply(function() {
          $scope.source[0].value = true;
          $scope.source[1].value = true;
          $scope.source[1].children.a.value = true;
          $scope.source[1].children.b.value = true;
          $scope.source[1].children.b.children[0].value = true;
          $scope.source[1].children.b.children[1].value = true;
        });

        expect($element.prop('checked')).toBe(true);
        expect($element.prop('indeterminate')).toBe(false);
      });

      it('should get indeterminate when some are checked', function() {
        $scope.$apply(function() {
          $scope.source[1].children.b.children[1].value = true;
        });

        expect($element.prop('checked')).toBe(false);
        expect($element.prop('indeterminate')).toBe(true);
      });

      it('should get unchecked when all are unchecked', function() {
        expect($element.prop('checked')).toBe(false);
        expect($element.prop('indeterminate')).toBe(false);
      });
    });
  });

  describe('when storing to a list', function() {
    beforeEach(function() {
      $element = angular.element(
        '<input type="checkbox" check-all="source" to-list="list">'
      );
      $scope.list = [];
    });

    describe('with an array source', function() {
      beforeEach(function() {
        $scope.source = [{}, {}];
        $compile($element)($scope);
        $scope.$digest();
      });

      test(0, 1);
    });

    describe('with an object source', function() {
      beforeEach(function() {
        $scope.source = {
          a: {},
          b: {}
        };
        $compile($element)($scope);
        $scope.$digest();
      });

      test('a', 'b');
    });

    function test(a, b) {
      it('should check all when clicked and none is checked', function() {
        $element.triggerHandler('click');

        expect($scope.list).toContain($scope.source[a]);
        expect($scope.list).toContain($scope.source[b]);
      });

      it('should check all when clicked and some are checked', function() {
        $scope.list.push($scope.source[a]);
        $element.triggerHandler('click');

        expect($scope.list).toContain($scope.source[a]);
        expect($scope.list).toContain($scope.source[b]);
      });

      it('should uncheck all when clicked and all are checked', function() {
        $scope.list.push($scope.source[a], $scope.source[b]);
        $element.triggerHandler('click');

        expect($scope.list).not.toContain($scope.source[a]);
        expect($scope.list).not.toContain($scope.source[b]);
      });

      it('should get checked when all are checked', function() {
        $scope.$apply(function() {
          $scope.list.push($scope.source[a], $scope.source[b]);
        });

        expect($element.prop('checked')).toBe(true);
        expect($element.prop('indeterminate')).toBe(false);
      });

      it('should get indeterminate when some are checked', function() {
        $scope.$apply(function() {
          $scope.list.push($scope.source[a]);
        });

        expect($element.prop('checked')).toBe(false);
        expect($element.prop('indeterminate')).toBe(true);
      });

      it('should get unchecked when all are unchecked', function() {
        expect($element.prop('checked')).toBe(false);
        expect($element.prop('indeterminate')).toBe(false);
      });

      it('should not remove unrelated entries when clicked and all are checked', function() {
        $scope.list.push($scope.source[a], $scope.source[b], null);
        $element.triggerHandler('click');

        expect($scope.list).toContain(null);
      });
    }
  });

  describe('when storing to a list by value', function() {
    beforeEach(function() {
      $element = angular.element(
        '<input type="checkbox"' +
              ' check-all="source"' +
              ' to-list="list"' +
              ' by-value="test">'
      );
      $scope.list = [];
    });

    describe('with an array source', function() {
      beforeEach(function() {
        $scope.source = [
          { test: 0 },
          { test: 1 }
        ];
        $compile($element)($scope);
        $scope.$digest();
      });

      test(0, 1);
    });

    describe('with an object source', function() {
      beforeEach(function() {
        $scope.source = {
          a: { test: 0 },
          b: { test: 1 }
        };
        $compile($element)($scope);
        $scope.$digest();
      });

      test('a', 'b');
    });

    function test(a, b) {
      it('should check all when clicked and none is checked', function() {
        $element.triggerHandler('click');

        expect($scope.list).toContain($scope.source[a].test);
        expect($scope.list).toContain($scope.source[b].test);
      });

      it('should check all when clicked and some are checked', function() {
        $scope.list.push($scope.source[a].test);
        $element.triggerHandler('click');

        expect($scope.list).toContain($scope.source[a].test);
        expect($scope.list).toContain($scope.source[b].test);
      });

      it('should uncheck all when clicked and all are checked', function() {
        $scope.list.push($scope.source[a].test, $scope.source[b].test);
        $element.triggerHandler('click');

        expect($scope.list).not.toContain($scope.source[a].test);
        expect($scope.list).not.toContain($scope.source[b].test);
      });

      it('should get checked when all are checked', function() {
        $scope.$apply(function() {
          $scope.list.push($scope.source[a].test, $scope.source[b].test);
        });

        expect($element.prop('checked')).toBe(true);
        expect($element.prop('indeterminate')).toBe(false);
      });

      it('should get indeterminate when some are checked', function() {
        $scope.$apply(function() {
          $scope.list.push($scope.source[a].test);
        });

        expect($element.prop('checked')).toBe(false);
        expect($element.prop('indeterminate')).toBe(true);
      });

      it('should get unchecked when all are unchecked', function() {
        expect($element.prop('checked')).toBe(false);
        expect($element.prop('indeterminate')).toBe(false);
      });

      it('should not remove unrelated entries when clicked and all are checked', function() {
        $scope.list.push($scope.source[a].test, $scope.source[b].test, 2);
        $element.triggerHandler('click');

        expect($scope.list).toContain(2);
      });
    }
  });

  describe('when storing to a list by value', function() {
    beforeEach(function() {
      $element = angular.element(
        '<input type="checkbox"' +
              ' check-all="source"' +
              ' to-list="list"' +
              ' by-value="value"' +
              ' nested-by="children">'
      );
      $scope.list = [];
    });

    describe('with a nested source', function() {
      beforeEach(function() {
        $scope.source = [
          {
            value: 0,
            children: {
              a: {
                value: 1
              },
              b: {
                value: 2,
                children: [
                  { value: 3 },
                  { value: 4 }
                ]
              }
            }
          }
        ];
        $compile($element)($scope);
        $scope.$digest();
      });

      it('should check all when clicked and none is checked', function() {
        $element.triggerHandler('click');

        expect($scope.list).toContain(0);
        expect($scope.list).toContain(1);
        expect($scope.list).toContain(2);
        expect($scope.list).toContain(3);
        expect($scope.list).toContain(4);
      });

      it('should check all when clicked and some are checked', function() {
        $scope.list.push(0, 1, 2, 3);
        $element.triggerHandler('click');

        expect($scope.list).toContain(0);
        expect($scope.list).toContain(1);
        expect($scope.list).toContain(2);
        expect($scope.list).toContain(3);
        expect($scope.list).toContain(4);
      });

      it('should uncheck all when clicked and all are checked', function() {
        $scope.list.push(0, 1, 2, 3, 4);
        $element.triggerHandler('click');

        expect($scope.list).not.toContain(0);
        expect($scope.list).not.toContain(1);
        expect($scope.list).not.toContain(2);
        expect($scope.list).not.toContain(3);
        expect($scope.list).not.toContain(4);
      });

      it('should get checked when all are checked', function() {
        $scope.$apply(function() {
          $scope.list.push(0, 1, 2, 3, 4);
        });

        expect($element.prop('checked')).toBe(true);
        expect($element.prop('indeterminate')).toBe(false);
      });

      it('should get indeterminate when some are checked', function() {
        $scope.$apply(function() {
          $scope.list.push(4);
        });

        expect($element.prop('checked')).toBe(false);
        expect($element.prop('indeterminate')).toBe(true);
      });

      it('should get unchecked when all are unchecked', function() {
        expect($element.prop('checked')).toBe(false);
        expect($element.prop('indeterminate')).toBe(false);
      });

      it('should not remove unrelated entries when clicked and all are checked', function() {
        $scope.list.push(0, 1, 2, 3, 4, 5);
        $element.triggerHandler('click');

        expect($scope.list).toContain(5);
      });
    });
  });

  describe('when storing to a list by key', function() {
    beforeEach(function() {
      $element = angular.element(
        '<input type="checkbox" check-all="source" to-list="list" by-key>'
      );
      $scope.list = [];
    });

    describe('with an array source', function() {
      beforeEach(function() {
        $scope.source = [{}, {}];
        $compile($element)($scope);
        $scope.$digest();
      });

      test(0, 1);
    });

    describe('with an object source', function() {
      beforeEach(function() {
        $scope.source = {
          a: {},
          b: {}
        };
        $compile($element)($scope);
        $scope.$digest();
      });

      test('a', 'b');
    });

    function test(a, b) {
      it('should check all when clicked and none is checked', function() {
        $element.triggerHandler('click');

        expect($scope.list).toContain(a);
        expect($scope.list).toContain(b);
      });

      it('should check all when clicked and some are checked', function() {
        $scope.list.push(a);
        $element.triggerHandler('click');

        expect($scope.list).toContain(a);
        expect($scope.list).toContain(b);
      });

      it('should uncheck all when clicked and all are checked', function() {
        $scope.list.push(a, b);
        $element.triggerHandler('click');

        expect($scope.list).not.toContain(a);
        expect($scope.list).not.toContain(b);
      });

      it('should get checked when all are checked', function() {
        $scope.$apply(function() {
          $scope.list.push(a, b);
        });

        expect($element.prop('checked')).toBe(true);
        expect($element.prop('indeterminate')).toBe(false);
      });

      it('should get indeterminate when some are checked', function() {
        $scope.$apply(function() {
          $scope.list.push(a);
        });

        expect($element.prop('checked')).toBe(false);
        expect($element.prop('indeterminate')).toBe(true);
      });

      it('should get unchecked when all are unchecked', function() {
        expect($element.prop('checked')).toBe(false);
        expect($element.prop('indeterminate')).toBe(false);
      });

      it('should not remove unrelated entries when clicked and all are checked', function() {
        $scope.list.push(a, b, null);
        $element.triggerHandler('click');

        expect($scope.list).toContain(null);
      });
    }
  });

  describe('when storing to an unitialized list', function() {
    beforeEach(function() {
      $element = angular.element(
        '<input type="checkbox" check-all="source" to-list="list">'
      );
      $scope.source = [];
      $compile($element)($scope);
      $scope.$digest();
    });

    it('should initialize the list', function() {
      $element.triggerHandler('click');

      expect($scope.list).toBeDefined();
    });
  });

  describe('when updating a source stored to a list', function() {
    describe('without any other option', function() {
      beforeEach(function() {
        $element = angular.element(
          '<input type="checkbox" check-all="source" to-list="list">'
        );
        $scope.source = [1, 2];
        $scope.list = [1, 2, 3];
        $compile($element)($scope);
        $scope.$digest();
      });

      it('should remove items that no longer exist from the list', function() {
        $scope.$apply(function() {
          $scope.source.pop();
        });

        expect($scope.list).toContain(1);
        expect($scope.list).not.toContain(2);
        expect($scope.list).toContain(3);
      });
    });

    describe('by value', function() {
      beforeEach(function() {
        $element = angular.element(
          '<input type="checkbox"'+
                ' check-all="source"' +
                ' to-list="list"' +
                ' by-value="value">'
        );
        $scope.source = [
          { value: 1 },
          { value: 2 }
        ];
        $scope.list = [1, 2, 3];
        $compile($element)($scope);
        $scope.$digest();
      });

      it('should remove items that no longer exist from the list', function() {
        $scope.$apply(function() {
          $scope.source.pop();
        });

        expect($scope.list).toContain(1);
        expect($scope.list).not.toContain(2);
        expect($scope.list).toContain(3);
      });
    });

    describe('by value (nested)', function() {
      beforeEach(function() {
        $element = angular.element(
          '<input type="checkbox"' +
                ' check-all="source"' +
                ' to-list="list"' +
                ' by-value="value"' +
                ' nested-by="children">'
        );
        $scope.source = [
          {
            value: 0,
            children: {
              a: {
                value: 1
              },
              b: {
                value: 2,
                children: [
                  { value: 3 },
                  { value: 4 }
                ]
              }
            }
          }
        ];
        $scope.list = [0, 1, 2, 3, 4];
        $compile($element)($scope);
        $scope.$digest();
      });

      it('should remove items that no longer exist from the list', function() {
        $scope.$apply(function() {
          delete $scope.source[0].children.a;
          $scope.source[0].children.b.children.pop();
        });

        expect($scope.list).toContain(0);
        expect($scope.list).not.toContain(1);
        expect($scope.list).toContain(2);
        expect($scope.list).toContain(3);
        expect($scope.list).not.toContain(4);
      });
    });

    describe('by key', function() {
      beforeEach(function() {
        $element = angular.element(
          '<input type="checkbox" check-all="source" to-list="list" by-key>'
        );
        $scope.source = [null, null];
        $scope.list = [0, 1, 2];
        $compile($element)($scope);
        $scope.$digest();
      });

      it('should remove items that no longer exist from the list', function() {
        $scope.$apply(function() {
          $scope.source.pop();
        });

        expect($scope.list).toContain(0);
        expect($scope.list).not.toContain(1);
        expect($scope.list).toContain(2);
      });
    });
  });
});