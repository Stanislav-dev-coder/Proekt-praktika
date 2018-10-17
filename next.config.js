const webpack = require('webpack');
const withStylus = require('@zeit/next-stylus');
const path = require('path');
require('dotenv').config();
const dev = process.env.NODE_ENV !== 'production';
const poststylus = require('poststylus');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;

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
    config.plugins.push(
      new webpack.DefinePlugin({
        IS_PROD: !dev,
        API_URL: JSON.stringify(process.env.API_URL),
      }),
    );
    if (!dev) {
      config.plugins.push(new CssoWebpackPlugin());
    }
    return config;
  },
  stylusLoaderOptions: {
    import: path.resolve('styles/common.styl'),
    use: [poststylus([require('autoprefixer')()])],
  },
};

module.exports = withStylus(config);
