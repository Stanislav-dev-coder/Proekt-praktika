require('dotenv').config();

const path = require('path');
const withCSS = require('@zeit/next-css');
const withStylus = require('@zeit/next-stylus');
const poststylus = require('poststylus');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;

const IS_DEV_MODE = process.env.NODE_ENV !== 'production';
const COMMON_STYES = path.resolve('styles/common.styl');

const config = {
  webpack: function(config) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
        },
      },
    });

    if (!IS_DEV_MODE) {
      config.plugins.push(new CssoWebpackPlugin());
    }

    return config;
  },
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: true,
    localIdentName: IS_DEV_MODE ? '[local]___[hash:base64:5]' : '[hash:base64:5]',
  },
  stylusLoaderOptions: {
    import: COMMON_STYES,
    use: [poststylus([require('autoprefixer')()])],
  },
  env: {
    IS_PROD: !IS_DEV_MODE,
    API_URL: process.env.API_URL,
  },
};

module.exports = withCSS(withStylus(config));
