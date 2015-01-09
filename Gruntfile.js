module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    markdown: {
      all: {
        files: [
          {
            expand: true,
            cwd: 'src/doc/',
            src: '*.md',
            dest: 'doc/',
            ext: '.html',
            filter: 'isFile'
          }
        ],
        options: {
          template: 'src/doc/_layout.html',
          preCompile: function(src, context) {},
          postCompile: function(src, context) {},
          templateContext: {},
          markdownOptions: {
            gfm: true,
            highlight: 'auto',
            codeLines: {
              before: '<span>',
              after: '</span>'
            }
          }
        }
      }
    },

    less: {
      development: {},
      production: {
        options: {
          cleancss: true,
        },
        files: {
          "doc/assets/doc.css": "src/doc/doc.less",
        }
      }
    },

    // concat: {
    //   options: {
    //     separator: '',
    //   },
    //   dist: {
    //     src: [
    //       'src/doc/_header.html',
    //       'doc/quickstart.html',
    //       'doc/project.html',
    //       'doc/scenes.html',
    //       'doc/layers.html',
    //       'doc/keyboard.html',
    //       'doc/mouse.html',
    //       'doc/resources.html',
    //       'doc/scope.html',
    //       'doc/utilities.html',
    //       'doc/extending.html',
    //       'doc/license.html',
    //       'src/doc/_footer.html',
    //     ],
    //     dest: 'doc/index.html',
    //   },
    // },

    watch: {
      scripts: {
        files: ['src/doc/*.*'],
        tasks: ['default'],
        options: {
          spawn: false,
        },
      },
    },

  });

  // Load the plugins
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  //grunt.loadNpmTasks('grunt-contrib-copy');
  //grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-markdown');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-contrib-qunit');

  // Default task (AKA BUILD)
  grunt.registerTask('default', ['markdown', 'less']);
};