const path = require('path');
const poststylus = require('poststylus');

module.exports = {
  stories: ['../components/**/*.stories.jsx'],
  addons: ['@storybook/addon-docs', '@storybook/addon-knobs/register', '@storybook/addon-actions/register', '@storybook/addon-viewport/register'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.stories\.jsx?$/,
      loaders: [require.resolve('@storybook/source-loader')],
      enforce: 'pre',
    });

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

    config.module.rules.push(
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: true,
              localIdentName: '[local]',
            },
          },
          {
            loader: 'stylus-loader',
            options: {
              import: [
                path.resolve('styles/common.styl'),
                path.resolve('styles/document.styl'),
              ],
              use: [poststylus([require('autoprefixer')()])],
            },
          },
        ],
        include: path.resolve(__dirname, '../'),
      }
    );

    return config;
  },
};