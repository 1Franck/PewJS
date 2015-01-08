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

    // uglify: {
    //   options: {
    //     banner: '/*! build <%= grunt.template.today("yyyy-mm-dd HH:mm:ss") %> */\n/*! Pew.js */\n/*! Copyright Francois Lajoie */\n/*! MIT License */\n'
    //   },
    //   my_target: {
    //     files: {
    //       'build/Pew.min.js': ['build/pew.js']
    //     }
    //   }
    // },

    // copy: {
    //   build: {
    //     files: [
    //       {
    //         cwd: 'src/boilerplate',     // set working folder / root to copy
    //         src: '**/*',                // copy all files and subfolders
    //         dest: '',  // destination folder
    //         expand: true                // required when using cwd
    //       },
    //       
    //   }
    // },

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
    //     separator: ';',
    //   },
    //   dist: {
    //     src: [],
    //     dest: '',
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

    // clean: {
    //   less: [""],
    // },

  });

  // Load the plugins
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  //grunt.loadNpmTasks('grunt-contrib-copy');
  //grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-markdown');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-contrib-qunit');

  // Default task (AKA BUILD)
  grunt.registerTask('default', ['markdown', 'less']);
};