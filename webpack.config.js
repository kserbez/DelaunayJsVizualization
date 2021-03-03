const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');


module.exports = (env) => {
    console.log('webpack env =', env);
    const isEnvDev = !(env && env.prod);

    const config = {
        mode: isEnvDev ? 'development' : 'production',

        entry: {
            main: path.resolve(__dirname, './src/index.js'),
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].bundle.js',
        },

        plugins: [
            new HtmlWebpackPlugin({
                title: 'Delaunay vizualization',
                template: path.resolve(__dirname, './src/main.html'),
                filename: 'index.html',
            }),
            new CleanWebpackPlugin(),
        ].concat(!isEnvDev ? [] : [
            new FaviconsWebpackPlugin('./src/favicon.ico'),
            // new webpack.HotModuleReplacementPlugin(),
            // new webpack.SourceMapDevToolPlugin(),
        ]),

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(scss|css)$/,
                    use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
                },
            ]
        },

        devServer: {
            historyApiFallback: true,
            contentBase: path.resolve(__dirname, './dist'),
            open: true,
            compress: true,
            hot: true,
            port: 8080,
        },
    };

    if (isEnvDev) {
        // config.devtool = 'inline-nosources-source-map';
    }

    return config;
};