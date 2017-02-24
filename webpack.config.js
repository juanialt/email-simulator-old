var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');
const APP_TITLE = 'umail';

module.exports = {
    devtool: 'inline-source-map',
    entry: ['babel-polyfill', APP_DIR + '/app/app.module.js'],
    output: {
        path: BUILD_DIR,
        filename: 'app.js'
    },
    module: {
        loaders: [{
            test : /\.js?/,
            exclude: /(node_modules|bower_components)/,
            loader: 'ng-annotate',
            include : APP_DIR
        }, {
            test : /\.js?/,
            exclude: /(node_modules|bower_components)/,
            include : APP_DIR,
            loader : 'babel-loader',
            query: {
                retainLines: true
            }
        }, {
            test: /\.scss$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader']
        }, {
            test: /\.css$/,
            loaders: [
                'style',
                'css?importLoaders=1'
            ]
        },]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: APP_TITLE,
            template: path.join(APP_DIR, '/index.html'), // Load a custom template
            inject: true, // Inject all scripts into the body
            //favicon: path.join(APP_DIR, '/favicon.ico')
        })
    ]
};
