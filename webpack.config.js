var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: path.join(__dirname, 'src', 'main.js'),
    output: {
        path: path.resolve(__dirname, "build"),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: path.join(__dirname, 'src'),
                query: {
                    presets: 'es2015',
                },
            },
            { loader: 'polymer-webpack-loader' },
            {
                test: /\.js/,
                loader: 'babel',
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.scss/,
                loader: 'style!css!sass',
                // Or
                loaders: ['style', 'css', 'sass'],
            },
            {
                test: /\.html/,
                loader: 'html',
            },
            {
              test: /\.html$/,
              loader: 'html-loader',
              include: [
                path.resolve(__dirname, './index.html'),
              ],
            },
            {
              test: /\.html$/,  
              loader: 'polymer-webpack-loader'
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    plugins: [
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map',
};