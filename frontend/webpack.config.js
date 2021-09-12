const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: ['./src/App.ts'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../backend/public/js'),
  },
  resolve: {
    extensions: ['.tsx','.ts','.jsx','.js'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'all',
    },
  },
  devtool: "source-map"
};
