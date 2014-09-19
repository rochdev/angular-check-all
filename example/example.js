angular.module('app', ['checklist-model', 'checkAll'])
  .controller('ExampleCtrl', function($scope) {
    $scope.all = {
      letters: {
        a: false,
        b: false,
        c: false
      },
      numbers: [
        { value: 'one', checked: false },
        { value: 'two', checked: false },
        { value: 'three', checked: false }
      ],
      cars: ['honda', 'toyota', 'mazda'],
      fruits: [
        { name: 'apple' },
        { name: 'banana' },
        { name: 'orange' }
      ],
      romanNumerals: {
        i: 1,
        ii: 2,
        iii: 3
      },
      sections: [
        {
          value: 1,
          children: [
            { value: 1.1 },
            { value: 1.2 },
            { value: 1.3 }
          ]
        },
        {
          value: 2,
          children: [
            { value: 2.1 },
            { value: 2.2 },
            { value: 2.3 }
          ]
        },
        {
          value: 3,
          children: [
            { value: 3.1 },
            { value: 3.2 },
            { value: 3.3 }
          ]
        }
      ],
      sectionns: {
        first: true,
        second: true
      }
    };

    $scope.selected = {
      cars: [],
      fruits: [],
      cards: [],
      romanNumerals: [],
      sections: []
    };
  });