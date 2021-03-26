const path = require('path');

module.exports = {
  entry: {
    login: './src/javascript/login/index.tsx',
    main: './src/javascript/main/index.tsx'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'web.tsconfig.json'
            }
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist', 'javascript'),
  },
  devtool: 'inline-source-map',
};