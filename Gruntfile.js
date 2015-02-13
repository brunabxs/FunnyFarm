module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'test/*.js', 'public/js/*.js']
    },
    jasmine : {
      components : {
        src : ['public/js/animals.js', 'public/js/floors.js', 'public/js/buildings.js', 'public/js/game.js'],
        options : {
          specs : 'test/*Spec.js',
          vendor : 'public/js/lib/*.js',
          helpers : 'test/lib/*.js',
          keepRunner : true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');


  // Default task.
  grunt.registerTask('travis', ['jshint', 'jasmine']);
};
