module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'angular-check-all.js',
      'test/**/*.spec.js'
    ],

    preprocessors: {
      'angular-check-all.js': ['coverage']
    },

    reporters: ['mocha', 'junit', 'coverage'],

    mochaReporter: {
      output: 'autowatch'
    },

    junitReporter: {
      outputDir: 'test/reports'
    },

    coverageReporter: {
      reporters: [
        {type: 'lcov'},
        {type: 'text-summary'}
      ]
    },

    autoWatch: true,

    browsers: ['PhantomJS']
  });
};
