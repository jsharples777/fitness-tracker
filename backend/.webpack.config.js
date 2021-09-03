const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  entry: {
    server: ['./dist/js/server.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist/js/'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    fallback: { url: false },
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'source-map-loader',
      },
    ],

  },
  //devtool: 'source-map',
  externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()],

};
