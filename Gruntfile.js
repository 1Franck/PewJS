module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! build <%= grunt.template.today("yyyy-mm-dd HH:mm:ss") %> */\n/*! Pew.js */\n/*! Copyright Francois Lajoie */\n/*! MIT License */\n'
      },
      my_target: {
        files: {
          'build/Pew.min.js': ['build/pew.js']
        }
      }
    },

    copy: {
      build: {
        files: [
          {
            cwd: 'src/boilerplate',     // set working folder / root to copy
            src: '**/*',                // copy all files and subfolders
            dest: 'build/boilerplate',  // destination folder
            expand: true                // required when using cwd
          },
          {
            src:  'build/Pew.js',     // set working folder / root to copy
            dest: 'demos/_assets/Pew.js',  // destination folder
          },
        ],
      },
      demos: {
        files: [
          {
            src:  'build/Pew.js',     // set working folder / root to copy
            dest: 'demos/_assets/Pew.js',  // destination folder
          },
        ],
      }
    },

    less: {
      development: {},
      production: {
        options: {
          cleancss: true,
        },
        files: {
          "demos/_assets/demo.css": "demos/_assets/demo.less",
        }
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/pew/pew.js', 
              'src/pew/project.js', 
              'src/pew/layer.js', 
              'src/pew/utils.js', 
              'src/pew/mouse.js', 
              'src/pew/keyboard.js', 
              'src/pew/resources.js',
              'src/pew/fps.js',
              'src/vendors/AnimationFrame/AnimationFrame.js'],

        dest: 'build/Pew.js',
      },
    },

    watch: {
      scripts: {
        files: ['src/pew/*.js', 'src/boilerplate/*.*'],
        tasks: ['default'],
        options: {
          spawn: false,
        },
      },

      tests: {
        files: ['build/pew.js', 'tests/*.js'],
        tasks: ['tests'],
        options: {
          spawn: false,
        },
      },

      demos: {
        files: ['demos/*.html', 'demos/_assets/*.*', 'demos/*/*.*'],
        tasks: ['demos'],
        options: {
          spawn: false,
        },
      },

    },

    clean: {
      //less: ["build/demos/_assets/demo.less"],
    },

    qunit: {
      all: ['tests/*.html']
    }

  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-qunit');

  // Default task (AKA BUILD)
  grunt.registerTask('default', ['concat', 'copy:build', 'uglify']);

  // Demos task
  grunt.registerTask('demos', ['less', 'copy:demos']);

  // Test task
  grunt.registerTask('tests', ['qunit']);

};