module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("simpleaccordion.jquery.json"),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.licenses[0].type %> License\n" +
				" */\n"
		},

		// Concat definitions
		concat: {
			dist: {
				src: ["src/jquery.simpleaccordion.js"],
				dest: "dist/jquery.simpleaccordion.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		// Lint definitions
		jshint: {
			files: ["src/jquery.simpleaccordion.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

    // SASS definitions
    sass: {
      dist: {
        files: {
          "dist/jquery.simpleaccordion.css" : "src/jquery.simpleaccordion.css.scss"
        }
      }
    },

		// Minify definitions
		uglify: {
			my_target: {
				src: ["dist/jquery.simpleaccordion.js"],
				dest: "dist/jquery.simpleaccordion.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		// CoffeeScript compilation
		coffee: {
			compile: {
				files: {
					"dist/jquery.simpleaccordion.js": "src/jquery.simpleaccordion.coffee"
				}
			}
		}

	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-sass");

	grunt.registerTask("default", ["jshint", "concat", "sass", "uglify"]);
	grunt.registerTask("travis", ["jshint"]);

};
