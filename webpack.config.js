const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: './src/main.js',

	output: {
		path: path.resolve(__dirname, './dist'), // for absolute path
		filename: 'bundle.js'
	},

	mode: "development",
};