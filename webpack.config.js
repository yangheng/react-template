/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 *
 * Copyright © 2015-2016 Konstantin Tarkus (@koistya)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const path = require('path');
const webpack = require('webpack');
const extend = require('extend');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-plus-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin')
//const Dashboard = require('webpack-dashboard')
//const DashboardPlugin = require('webpack-dashboard/plugin');
const DEBUG = !(process.argv.slice(2) == '--release');
const VERBOSE = process.argv.slice(2) == '--verbose';
const ExtractStyle = new ExtractTextPlugin('style.css')
//const dashboard = new Dashboard()
const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];

/**
 * Webpack configuration (core/main.js => build/bundle.js)
 * http://webpack.github.io/docs/configuration.html
 */
const config = {

  // The base directory
  context: path.resolve(__dirname, 'src'),

  // The entry point for the bundle
  entry: {
    app: "./main.js",
    vendor: [
      'es5-shim',
      'es5-shim/es5-sham',
      'es6-promise',
      'babel-polyfill',
      'fetch-detector',
      'fetch-ie8'
    ]
  },

  // Options affecting the output of the compilation
  output: {
    path: path.resolve(__dirname, 'src/static'),
    publicPath: '/',
    filename: 'assets/[name].js',
    chunkFilename: 'assets/[name].js',
    sourcePrefix: '',
  },
  devServer:{
    outputPath:path.resolve(__dirname, 'src/static'),
    /*historyApiFallback:{
      index: '/'
    }*/
  },
  externals: {
    'react':'React',
    'react-dom':'ReactDOM'
  },
  resolve: {
    alias:{
      'react': path.resolve(__dirname,'node_modules/react/dist/react.js'),
      'react-dom': path.resolve(__dirname,'node_modules/react-dom/dist/react-dom.js'),
    }
  },

  // Switch loaders to debug or release mode
  debug: DEBUG,
  cache: DEBUG,

  // Developer tool to enhance debugging, source maps
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: DEBUG ? 'source-map' : false,

  // What information should be printed to the console
  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },

  // The list of plugins for Webpack compiler
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
      __DEV__: DEBUG,
      __BASENAME__: JSON.stringify(process.env.BASENAME || '')
    }),
    new BellOnBundlerErrorPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name:"common"
    }),
    ExtractStyle,

    new HtmlWebpackPlugin({
      inject:"body",
      title:"方东略商城系统",
      template: path.resolve(__dirname, 'template/index.ejs'),
    })
  ],

  // Options affecting the normal modules
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        loader: 'babel-loader',
        query: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: DEBUG,

          // https://babeljs.io/docs/usage/options/
          babelrc: false,
          presets: [
            'react',
            'es2015-loose',
            'stage-1',
          ],
          plugins: [
            'transform-runtime',
            ['import',{ "libraryName": "antd", "style": "css", "libraryDirectory":'lib'}],
            ...DEBUG ? [] : [
              'transform-react-remove-prop-types',
              'transform-react-constant-elements',
              'transform-react-inline-elements',
              'transform-es3-modules-literals',
              'transform-es3-member-expression-literals',
              'transform-es3-property-literals'
            ],
          ],
        },
      },
      {
        test: /\.css/,
        loader: ExtractStyle.extract("style-loader", `css-loader?${JSON.stringify({
              sourceMap: DEBUG,
              minimize: !DEBUG,
            })}!postcss-loader?pack=default`)
      },
      {
        test: /\.scss$/,
        loader: ExtractStyle.extract(`style-loader`,`css-loader?${JSON.stringify({
        sourceMap: DEBUG,
        minimize: !DEBUG,
      })}!postcss-loader?pack=sass!sass-loader`)


      },
      {
        test: /\.less$/,
        loader: ExtractStyle.extract('style-loader',
          `css-loader?${JSON.stringify({ sourceMap: DEBUG, minimize: !DEBUG })}!postcss-loader?pack=less!less-loader`)
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader',
        query: {
          name: DEBUG ? 'assets/[path][name].[ext]?[hash]' : '[hash].[ext]',
          limit: 10000,
        },
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
        query: {
          name: DEBUG ? 'assets/[path][name].[ext]?[hash]' : '[hash].[ext]',
        },
      },
    ]
  },

  // The list of plugins for PostCSS
  // https://github.com/postcss/postcss
  postcss(bundler) {
    return {
      default: [
        // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
        // https://github.com/postcss/postcss-import
        require('postcss-import')({ addDependencyTo: bundler }),
        // W3C variables, e.g. :root { --color: red; } div { background: var(--color); }
        // https://github.com/postcss/postcss-custom-properties
        require('postcss-custom-properties')(),
        // W3C CSS Custom Media Queries, e.g. @custom-media --small-viewport (max-width: 30em);
        // https://github.com/postcss/postcss-custom-media
        require('postcss-custom-media')(),
        // CSS4 Media Queries, e.g. @media screen and (width >= 500px) and (width <= 1200px) { }
        // https://github.com/postcss/postcss-media-minmax
        require('postcss-media-minmax')(),
        // W3C CSS Custom Selectors, e.g. @custom-selector :--heading h1, h2, h3, h4, h5, h6;
        // https://github.com/postcss/postcss-custom-selectors
        require('postcss-custom-selectors')(),
        // W3C calc() function, e.g. div { height: calc(100px - 2em); }
        // https://github.com/postcss/postcss-calc
        require('postcss-calc')(),
        // Allows you to nest one style rule inside another
        // https://github.com/jonathantneal/postcss-nesting
        require('postcss-nesting')(),
        // W3C color() function, e.g. div { background: color(red alpha(90%)); }
        // https://github.com/postcss/postcss-color-function
        require('postcss-color-function')(),
        // Convert CSS shorthand filters to SVG equivalent, e.g. .blur { filter: blur(4px); }
        // https://github.com/iamvdo/pleeease-filters
        require('pleeease-filters')(),
        // Generate pixel fallback for "rem" units, e.g. div { margin: 2.5rem 2px 3em 100%; }
        // https://github.com/robwierzbowski/node-pixrem
        require('pixrem')(),
        // W3C CSS Level4 :matches() pseudo class, e.g. p:matches(:first-child, .special) { }
        // https://github.com/postcss/postcss-selector-matches
        require('postcss-selector-matches')(),
        // Transforms :not() W3C CSS Level 4 pseudo class to :not() CSS Level 3 selectors
        // https://github.com/postcss/postcss-selector-not
        require('postcss-selector-not')(),
        // Add vendor prefixes to CSS rules using values from caniuse.com
        // https://github.com/postcss/autoprefixer
        require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
      ],
      sass: [
        require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
      ]
    };
  }
};

// Optimize the bundle in release (production) mode
if(DEBUG){
  config.plugins.push(new CopyWebpackPlugin([
    {from:path.resolve(__dirname,'node_modules/react/dist/react.js'),
      to:path.resolve(__dirname,'src/static/react.js')
        },
    {from:path.resolve(__dirname,'node_modules/react-dom/dist/react-dom.js'),
      to:path.resolve(__dirname,'src/static/react-dom.js')}
  ]))
  //config.plugins.push(new DashboardPlugin(dashboard.setData))
  config.module.loaders.find(x => x.loader === 'babel-loader').query.plugins.unshift('react-hot-loader/babel');
  config.plugins.push(new webpack.NoErrorsPlugin());
  //config.plugins.push(new webpack.optimize.DedupePlugin());

  config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
}
if (!DEBUG) {

  config.plugins.push(
      config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        comments:false,
        sourceMap:false,
        compress: { warnings: VERBOSE, screw_ie8: false },
        mangle: { screw_ie8: false },
        output: { screw_ie8: false }
      }))
  )



}

module.exports = config;
