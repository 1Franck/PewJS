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
      main: {
        files: [
          {
            cwd: 'src/demos',     // set working folder / root to copy
            src: '**/*',          // copy all files and subfolders
            dest: 'build/demos',  // destination folder
            expand: true          // required when using cwd
          }
        ],
      }
    },

    less: {
      development: {
      },
      production: {
        options: {
          cleancss: true,
        },
        files: {
          "build/demos/demo.css": "src/demos/demo.less",
        }
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/pew/pew.js', 
              'src/pew/utils.js', 
              'src/pew/mouse.js', 
              'src/pew/keyboard.js', 
              'src/pew/resources.js',
              'src/pew/fps.js', 
              'src/pew/log.js', 
              'src/pew/debug.js', 
              'src/vendors/AnimationFrame/AnimationFrame.js'],

        dest: 'build/Pew.js',
      },
    },

    watch: {
      scripts: {
        files: ['src/pew/*.js','src/demos/*/*.js'],
        tasks: ['default'],
        options: {
          spawn: false,
        },
      },
    },

    clean: {
      less: ["build/demos/demo.less"]
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['less', 'concat', 'copy', 'uglify', 'clean']);

};