const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generate an HTML file for your application
      new HtmlWebpackPlugin({
        template: '/dist/index.html', // Path to your HTML template
        filename: 'index.html', // Output HTML file name
      }),

      // Generate a manifest file for your PWA
      new WebpackPwaManifest({
        name: 'TextEditor',
        short_name: 'TXTEdit',
        description: 'Used to create notes or code snippets with or without an internet connection',
        background_color: '#ffffff',
        theme_color: '#000000',
        start_url: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Path to your app icon
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('icons'),
          },
        ],
      }),

      // Generate and inject the service worker into your app
      new InjectManifest({
        swSrc: './src-sw.js', // Path to your service worker file
      }),
    ],

    module: {
      rules: [
        // Rule for processing CSS files
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        // Rule for transpiling JavaScript using Babel
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
