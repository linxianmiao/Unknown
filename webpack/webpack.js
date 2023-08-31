'use strict'

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const resolvePath = _path => path.resolve(__dirname, _path);

const DistPath = resolvePath('../dist');
const SrcPath = resolvePath('../src');

module.exports = {
    mode: 'development',
    resolve:{
        // ...
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss', '.css'],
    },
    entry: {
        app: resolvePath('../src/App.tsx')
    },
    output: {
        path: DistPath,
        clean: true,
        filename: 'js/[name].[contenthash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader, // 将css提取成单独文件
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|webp|gif|svg)$/,
                type: 'asset',
                generator: {
                    filename: 'images/[name].[hash:10][ext]'
                },

            },
            {
                // 处理字体资源
                test: /\.(woff2?|ttf)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                include: SrcPath,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react',
                        '@babel/preset-typescript'
                    ],
                }
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: DistPath,
        },
        compress: true,
        port: 3000,
        client: {
            webSocketTransport: 'ws',
            webSocketURL: 'ws://127.0.0.1:3000/ws',
        },
        webSocketServer: 'ws',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolvePath('../public/index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
        }),
    ]
}