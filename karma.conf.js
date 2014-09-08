module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'check-all.js',
      'test/**/*.spec.js'
    ],

    reporters: ['mocha', 'junit'],

    autoWatch: true,

    browsers: ['PhantomJS']
  });
};
