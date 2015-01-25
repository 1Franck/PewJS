module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! build <%= grunt.template.today("yyyy-mm-dd HH:mm:ss") %> */\n/*! pew.js */\n/*! Copyright Francois Lajoie */\n/*! MIT License */\n'
      },
      my_target: {
        files: {
          'build/pew.min.js': ['build/pew.js']
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
            src:  'build/pew.js',     // set working folder / root to copy
            dest: 'demos/assets/pew.js',  // destination folder
          },
        ],
      },
      demos: {
        files: [
          {
            src:  'build/pew.js',     // set working folder / root to copy
            dest: 'demos/assets/pew.js',  // destination folder
          },
        ],
      },
      gh_pages: {
        files: [
          {
            src:  'build/pew.min.js',                            // set working folder / root to copy
            dest: '../pewjs.gh-pages/demos/assets/pew.min.js',   // destination folder
          },
        ],
      },
    },

    less: {
      development: {},
      production: {
        options: {
          cleancss: true,
        },
        files: {
          "demos/assets/demo.css": "demos/assets/demo.less",
        }
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/pew/_h.js',
              'src/pew/pew.js', 
              'src/pew/scene.js', 
              'src/pew/layer.js', 
              'src/pew/project.js', 
              'src/pew/mouse.js', 
              'src/pew/keyboard.js', 
              'src/pew/resources.js',
              'src/pew/sprites.js',
              'src/pew/audio.js',
              'src/pew/fps.js',
              'src/pew/utils.js', 
              'src/pew/_f.js',
              'src/vendors/AnimationFrame/AnimationFrame.js'],

        dest: 'build/pew.js',
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
        files: ['demos/*.html', 'demos/assets/*.less', 'demos/*/*.*'],
        tasks: ['demos'],
        options: {
          spawn: false,
        },
      },

    },

    clean: {
      //less: ["build/demos/assets/demo.less"],
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

  // gh-pages task
  grunt.registerTask('gh-pages', ['copy:gh_pages']);

};