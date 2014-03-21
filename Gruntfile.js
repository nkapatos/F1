module.exports = function(grunt)
{

  // Project configuration.
  grunt.initConfig(
  {
    pkg: grunt.file.readJSON('package.json'),

    // compile stylus files to css files. Watch task
    stylus:
    {
      dev:
      {
        options:
        {
          compress: false
          //use: [require('jeet', 'nib')],
        },
        files:
        {
          'src/css/app.css' : 'src/css/app.styl',
        }
      },
      dist:
      {
        options:
        {
          compress: true,
          linenos:  false,
        },
        files: // Config dist to concat files
        {
          'dist/css/style.css' : 'src/css/*.styl',
        }
      }
    },

    // js check
    jshint:
    {
      options:
      {
        'eqeqeq':        true, // == vs ===
        'forin':         true, // for in loops
        'trailing':      true, // extra spaces
        'sub':           true,
        'globalstrict':  true,
        'globals':
        {
          "angular":     true
        }
      },
      def:
      {
        src: ['src/js/*.js']
      },
      dist:
      {
        src: ['dist/js/*.js']
      }
    },

    readme_generator:
    {
      main:
      {
        options:
        {
          readme_folder:      "docs",
          output:             "README.md",
          table_of_contents:  true,
          generate_changelog: false,
          generate_footer:    true,
          changelog_folder:   "docs/changelogs",
          github_username:    "PixelVibe",
          generate_title:     true,
          informative:        true,
        },
        order:
        {
          "header.md":       "F1 Feed",
          "overview.md":     "Overview",
          "installation.md": "Installation",
          "features.md":     "Features",
          "licence.md":      "Licence"
        }
      }
    },

    concat: {
      dist:
      {
        src: ['dist/js/app-split/*.js',],
        dest: 'dist/js/app-concat.js'
      }
    },

    ngmin:
    {
      dist:
      {
        expand: true,
        cwd: 'src/js',
        src: ['*'],
        dest: 'dist/js/app-split/'
      }
    },

    uglify:
    {
      dist:
      {
        files:
        {
          'dist/js/app.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    processhtml:
    {
      dist:
      {
        files:
        {
          'dist/index.html': ['src/index.html']
        }
      }
    },

    copy: {
      dist: {
        files:
        [
          {
            expand: true,
            cwd: 'src',
            src: 
            [
              'img/**',
              'partials/**',
              'lib/**'
            ],
            dest:   'dist/',
            filter: 'isFile'
          },
          {
            'dist/js/vendor/jquery.min.js': 'bower_components/jquery/dist/jquery.min.js',
            'dist/js/vendor/bootstrap.min.js': 'bower_components/bootstrap/dist/js/bootstrap.min.js',
            'dist/js/vendor/angular/angular-route.min.js': 'bower_components/angular-route/angular-route.min.js',
            'dist/js/vendor/angular/angular-sanitize.min.js': 'bower_components/angular-sanitize/angular-sanitize.min.js'
          },
          {
            'dist/css/body.css': 'src/css/body.css',
            'dist/css/bootstrap.min.css': 'bower_components/bootstrap/dist/css/bootstrap.min.css',
            'dist/css/bootstrap-theme.min.css': 'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
          }
        ]
      }
    },

    // Watcher
    watch: {
        stylus:{
          files: 'src/css/*.styl',
          tasks: 'stylus:dev'
        },
        jscheck:
        {
          files: ['src/js/*.js'],
          tasks:  'jshint'
        },
        livereload: {
            options: { livereload: true },
            files: ['src/index.html', 'src/partials/*.tpl.html','src/js/*.js', 'src/css/*.css']
        }
    }

  });

  // Autoload all grunt plugins in devdependendencies
  require('load-grunt-tasks')(grunt);
  
  // Watcher for development
  grunt.registerTask('devwatch', ['watch']);
  
  // Build task for distribution version
  grunt.registerTask('build', ['ngmin', 'concat', 'uglify', 'stylus:dist', 'copy', 'processhtml']);
  
  // Build readme file
  grunt.registerTask('readme', ['readme_generator']);

};