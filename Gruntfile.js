module.exports = function (g) {
  var files = ['Gruntfile.js', '.jshintrc', 'index.js', 'lib/**/**.js', 'routes/**/**.js', 'specs/**/**.js', 'models/**/**.js'];
  g.initConfig({
    pkg: g.file.readJSON('package.json'),
    bower: {
      copy: {
        options: {
          install: false,
          targetDir: './app',
          layout: function (type) {
              if (type === 'js') {
                type = 'scripts';
              }
              return type;
          },
          verbose: true
        }
      }
    },
    jshint: {
      files: files
    }
  });

  g.loadNpmTasks('grunt-contrib-jshint');
  g.loadNpmTasks('grunt-bower-task');

  g.registerTask('test', ['jshint']);
  g.registerTask('default', ['jshint']);
};