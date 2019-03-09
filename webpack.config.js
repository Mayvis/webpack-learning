const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const glob = require('glob');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin'); // 未用到的css在編譯時移除，搭配glob及path
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清除dist內容 rebuild
const BuildManifestPlugin = require('./build/plugins/BuildManifestPlugin');
const inProduction = (process.env.NODE_ENV === 'production');

const PATHS = {
    src: path.join(__dirname, 'src')
};

module.exports = {
    entry: {
        app: [
            './src/main.js',
            './src/main.scss'
        ]
    },

    output: {
        path: path.resolve(__dirname, './dist'), // for absolute path
        filename: '[name].[chunkhash].js'
    },

    module: {
        rules: [{
                test: /\.s[ac]ss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader', 'sass-loader'
                ]
            },

            {
                test: /\.(svg|eot|ttf|woff|woff2)$/,
                use: 'file-loader',
            },

            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loaders: [{
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[hash].[ext]'
                        },
                    },
                    'img-loader'
                ],
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
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash].css'
        }),

        new PurgecssPlugin({
            // paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
            paths: glob.sync('index.html', { nodir: true }), // 放置要檢查的檔案
        }),

        new CleanWebpackPlugin({
            root: __dirname,
            varbose: true,
            dry: false,
        }),

        new BuildManifestPlugin,
    ],

    mode: "development",
};

if (inProduction) {
    module.exports.plugins.push(
        new UglifyJsPlugin(),
    )
}