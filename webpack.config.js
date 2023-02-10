const path = require("path")
const glob = require('glob')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-typescript', '@babel/preset-env'],
            plugins: [
              ["@babel/plugin-transform-react-jsx", {
                "runtime": "automatic",
                "importSource": "preact",
              }]
            ]
          }
        }
      },
      {
        test: /\.m?js$/,

        exclude: /node_modules/
        ,
        loader: 'babel-loader',
        options: {
          cacheCompression: false,
          cacheDirectory: true,
        },
      },
    ],
  },
  entry: glob.sync('./src/static/*.tsx').reduce((acc, p) => {
    const entry = p.replace('.tsx', '').replace('./src/static/', '')

    acc[entry] = {
      import: p,
      dependOn: "preact",
    }
    return acc
  }, { preact: { import: ['preact', '@preact/signals'] } }),

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'lib/static'),
  },
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '.temp_cache'),
  },
  optimization: {
    usedExports: true,
    sideEffects: false
  },
};