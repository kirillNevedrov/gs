var path = require("path");
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var cssnext = require('postcss-cssnext');
var lost = require('lost');

module.exports = {
    entry: "./wwwroot/js/main.jsx",
    output: {
        path: './wwwroot/dist',
        filename: "bundle.js",
    },
    devServer: {
        inline: true,
        port: 3333,
        contentBase: './wwwroot/dist',
        historyApiFallback: true
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react', 'stage-2']
                }
            },
            {
                test:   /\.scss$/,
                loader: "style-loader!css-loader!postcss-loader"
            },
            {test: /\.(woff|woff2)$/, loader: "url?limit=10000&minetype=application/font-woff"},
            {test: /\.ttf$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
            {test: /\.eot$/, loader: "file"},
            {test: /\.svg$/, loader: "url?limit=10000&mimetype=image/svg+xml"},
            {test: /\.png$/, loader: "url?limit=10000&mimetype=image/png"}
        ]
    },
    postcss: function () {
        return [autoprefixer, precss, lost];
    },
    resolve: {
        root: path.resolve('./wwwroot'),
        extensions: ['', '.js', '.jsx']
    }
};