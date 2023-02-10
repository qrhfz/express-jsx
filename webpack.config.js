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
            cacheCompression: false,
            cacheDirectory: path.resolve(__dirname, '.temp_cache'),
            presets: ['@babel/preset-typescript', '@babel/preset-env'],
            plugins: [
              ["@babel/plugin-transform-react-jsx", {
                "runtime": "automatic",
                "importSource": "preact",
              }]
            ]
          }
        }
      }
    ],
  },
  entry: {
    shared: ['preact', '@preact/signals'],
    ...glob.sync('./src/static/*.{ts,tsx}').reduce((acc, p) => {
      const entry = p.replace('.tsx', '')
        .replace('.ts', '')
        .replace('./src/static/', '')

      acc[entry] = {
        import: p,
        dependOn: 'shared',
      }
      return acc
    }, {})
  },

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
  resolve: {
    extensions: ['.ts', '.js', 'tsx'],
  }
};