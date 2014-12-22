module.exports = function (g) {
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
      files: ['app/scripts/game/**/*.js']
    },
    mocha: {
      all: {
        src: ['specs/**/*.html']
      }
    }
  });

  g.loadNpmTasks('grunt-contrib-jshint');
  g.loadNpmTasks('grunt-bower-task');
  g.loadNpmTasks('grunt-mocha');

  g.registerTask('test', ['jshint', 'mocha:all']);
  g.registerTask('default', ['jshint']);
};