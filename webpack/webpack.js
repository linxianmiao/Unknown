'use strict'

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpakcPlugin = require('copy-webpack-plugin');

const resolvePath = _path => path.resolve(__dirname, _path);
const DistPath = resolvePath('../dist');
const SrcPath = resolvePath('../src');

const cssRegex = /\.css$/;
const sassRegex = /\.(scss|sass)$/;

module.exports = (webpackEnv = 'development') => {
    let {
        runtime
    } = webpackEnv;
    runtime = runtime || 'development';

    console.log('env', runtime)
    const isEnvDevelopment = runtime === 'development';
    const isEnvProduction = runtime === 'production';

    // common function to get style loaders
    const getStyleLoaders = (cssOptions, preProcessor) => {
        const loaders = [
            isEnvDevelopment && 'style-loader',
            isEnvProduction && MiniCssExtractPlugin.loader,
            {
                loader: require.resolve('css-loader'),
                options: cssOptions,
            },
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        plugins: ['postcss-preset-env']
                    },
                    sourceMap: isEnvDevelopment
                }
            }
        ].filter(Boolean);
        if (preProcessor) {
            loaders.push(
                {
                    loader: require.resolve(preProcessor),
                    options: {
                        sourceMap: true,
                    },
                }
            )
        }
        return loaders;
    }

    return {
        mode: 'development',
        resolve: {
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
                    test: cssRegex,
                    use: getStyleLoaders(
                        {
                            importLoaders: 1,
                            sourceMap: isEnvDevelopment
                        }
                    )
                },
                {
                    test: sassRegex,
                    use: getStyleLoaders(
                        {
                            importLoaders: 3,
                            sourceMap: isEnvDevelopment
                        },
                        'sass-loader'
                    )
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
                        babelrc: false,
                        configFile: false,
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
            allowedHosts: 'all',
            compress: true,
            port: 3000,
            client: {
                webSocketTransport: 'ws',
                webSocketURL: 'ws://127.0.0.1:3000/ws',
            },
            hot: true,
            webSocketServer: 'ws',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: resolvePath('../public/index.html'),
                faviconFile: isEnvProduction ? DistPath + '/favicon.ico' : ('/favicon.ico'),
                filename: isEnvProduction ? 'index.ejs' : 'index.html'
            }),
            new CopyWebpakcPlugin({
                patterns: [
                    { from: 'public/favicon.ico', to: DistPath }
                ]
            }),
            isEnvProduction &&
                new MiniCssExtractPlugin({
                    filename: "css/[name].[contenthash:8].css",
                }),
        ].filter(Boolean)s
    }
}