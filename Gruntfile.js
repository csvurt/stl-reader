
module.exports = function(grunt) {

  grunt.initConfig({
    mochacli: {
      options: {
        reporter: 'nyan',
        bail: true
      },
      all: ['test/*.js']
    },
    jshint: {
      all: ['*.js', 'spec/**/*.js', '!DataStream.js',
        '!node_modules', '!test']
    }
  });

  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('test', ['mochacli']);
  grunt.registerTask('lint', ['jshint']);
};
