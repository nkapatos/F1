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
        [{
          cwd:  'src/assets/styles/',
          src:  [ '*.styl' ],
          dest: 'bin/assets/styles/',
          ext:  '.css'
        }]
      }
    },

    // js check
    jshint:
    {
      options:
      {
        'eqeqeq':        true, // = = vs ===
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
          "header.md":       "Tada!",
          "overview.md":     "Overview",
          "installation.md": "Installation",
          "features.md":     "Features",
          "licence.md":      "Licence"
        }
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
  // grunt.registerTask('binbuild', ['sync']);
  
  // Build readme file
  grunt.registerTask('readme', ['readme_generator']);

};