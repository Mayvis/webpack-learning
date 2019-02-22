const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/main.js',

    output: {
        path: path.resolve(__dirname, './dist'), // for absolute path
        filename: 'bundle.js'
    },

    module: {
        rules: [
        	{
        		test: /\.s[ac]ss$/,
        		use: ['style-loader', 'css-loader', 'sass-loader']
        	},

        	{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },

    plugins: [
        new UglifyJsPlugin()
    ],

    mode: "development",
};