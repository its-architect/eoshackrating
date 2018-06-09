const
    path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    autoprefixer = require('autoprefixer'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
    CleanWebpackPlugin = require('clean-webpack-plugin');


const
    publicFolder = path.resolve(__dirname, 'public'),
    srcFolder = path.resolve(__dirname, 'src');

const config = {
    /**
     * Source maps
     */
    devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : false,

    /**
     * Entry application point
     */
    entry: [
        'react-hot-loader/patch',
        path.resolve(srcFolder, 'common.scss'),
        path.resolve(srcFolder, 'index.js'),
    ],

    /**
     * Output options
     */
    output: {
        publicPath: '/',
        path: publicFolder,
        filename: process.env.NODE_ENV !== 'production' ? '[hash].bundle.js' : '[hash].bundle.min.js',
    },

    /**
     * Options affecting the resolving of modules
     * https://webpack.js.org/configuration/resolve/
     */
    resolve: {
        modules: [ srcFolder, 'node_modules', ],
        extensions: [ '.js', ],
    },

    /**
     * Webpack dev server configuration
     * https://webpack.js.org/configuration/dev-server/
     */
    devServer: {
        port: 8080,
        contentBase: './public',
        historyApiFallback: true,
        hot: true,
        proxy: {
            '/api': {
                target: 'https://astage.itsphere.io',
                pathRewrite: { '^/api': '', },
                secure: false,
                changeOrigin: true,
            },
        },
    },

    module: {
        /**
         * List of loaders
         *
         * babel-loader: transpile code (ES6/ES7) into ES5
         * https://github.com/babel/babel-loader
         *
         * file-loader
         * https://github.com/webpack-contrib/file-loader
         *
         * Convert scss to css and extract to separate file
         * https://github.com/jtangelder/sass-loader
         * https://github.com/postcss/postcss-loader
         */
        rules: [
            {
                enforce: 'pre',
                test: /\.jsx?$/,
                include: [ srcFolder, ],
                loader: 'eslint-loader',
                options: {
                    configFile: path.join(__dirname, '.eslintrc'),
                    formatter: require('eslint-friendly-formatter'),
                    quiet: true,
                    failOnError: false,
                    failOnWarning: false,
                    emitError: false,
                    emitWarning: true,
                },
            },

            {
                test: /\.jsx?$/,
                include: [ srcFolder, ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        /**
                         * Use modules: false, otherwise hot-reloading will be broken
                         */
                        presets: [ [ 'env', {
                            targets: {
                                browsers: [ 'last 2 versions', ],
                            },
                            modules: false,
                        }, ], 'react', ],
                        plugins: [ 'react-hot-loader/babel', 'transform-object-rest-spread', 'transform-class-properties', ],
                    },
                },
            },

            {
                test: /\.(png|jpeg|jpg|svg|gif|pdf)$/,
                loader: 'file-loader?name=images/[name].[ext]',
            },

            {
                test: /\.(otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
            },

            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        /**
                         * Allow to import css in js
                         */
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true, // css imported to js will be as object
                                importLoaders: 2, // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                                localIdentName: '[name]__[local]___[hash:base64:5]',
                            },
                        },
                        /**
                         * Postcss autoprefixer + autoprefixer
                         * https://github.com/postcss/autoprefixer
                         */
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers: [ 'Safari >= 9', 'last 2 versions', ],
                                    }),
                                ],
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                includePaths: [
                                    path.resolve('./src/common'),
                                ],
                            },
                        },
                        /**
                         * SASS Variables and mixins
                         * https://github.com/shakacode/sass-resources-loader
                         */
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: [
                                    path.resolve(srcFolder, 'assets/scss/_variables.scss'),
                                    path.resolve(srcFolder, 'assets/scss/_mixins.scss'),
                                ],
                            },
                        },
                    ],
                }),
            },
        ],
    },

    plugins: [
        /**
         * HtmlWebpackPlugin: copy index.html as a template and inject scripts
         * https://github.com/jaketrent/html-webpack-template
         */
        new HtmlWebpackPlugin({
            inject: true,
            favicon: path.resolve(srcFolder, 'assets/images/favicon.ico'),
            template: path.resolve(srcFolder, 'index.html'),
        }),
        /**
         * webpack.DefinePlugin: define global variables
         * https://webpack.github.io/docs/list-of-plugins.html#defineplugi
         */
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                STAGE: JSON.stringify(process.env.STAGE),
            },
        }),
        /**
         * ExtractTextPlugin: create separate files
         * https://github.com/webpack/extract-text-webpack-plugin
         */
        new ExtractTextPlugin({
            filename: process.env.NODE_ENV !== 'production' ? '[hash].styles.css' : '[hash].style.min.css',
            allChunks: true,
            disable: process.env.NODE_ENV === 'development',
        }),

        /**
         * Configure hot reloading
         * https://webpack.js.org/plugins/hot-module-replacement-plugin
         * https://webpack.js.org/plugins/named-modules-plugin
         */
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
    ],
};

if ( process.env.NODE_ENV === 'production' ) {
    /**
     * UglifyJSPlugin: minify and optimize code
     * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
     */
    config.plugins.push(
        new CleanWebpackPlugin(publicFolder, {
            root: __dirname,
            verbose: true,
        }),
        new UglifyJSPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unused: true,
                dead_code: true,
            },
            output: {
                comments: false,
            },
        }),
    );

    /**
     * Remove hot loader from production
     */
    config.entry.shift();
}
if ( process.env.ANALYZE_BUNDLE === 'true' ) {
    config.plugins.push(
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: 'report.html',
            defaultSizes: 'parsed',
            generateStatsFile: true,
            statsFilename: 'stats.json',
        })
    );

    /**
     * Remove hot loader from production
     */
    config.entry.shift();
}

module.exports = config;
