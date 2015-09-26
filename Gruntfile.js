module.exports = function (grunt) {
	"use strict";
	grunt.initConfig({
		compass: {
			dist: {
				options: {
					sassDir: 'static/css',
					cssDir: 'css'
				}
			}
		},
		pkg: grunt.file.readJSON('package.json')
	});

	grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.registerTask('default', []);
};