const commonPaths = require('./common-paths');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: {
    polyfill: '@babel/polyfill',
    vendor: ['semantic-ui-react']
  },
  output: {
    path: commonPaths.outputPath,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000, // Convert images < 8kb to base64 strings
            name: './images/[hash]-[name].[ext]'
          }
        }]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: 'vendor',
          name: 'vendor',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `public/index.html`,
      favicon: `public/favicon.ico`
    }),
    new webpack.DefinePlugin({
      ENVAR_CONTRACT_ADDRESS: JSON.stringify(process.env.CONTRACT_ADDRESS),
      ENVAR_API_URL: JSON.stringify(process.env.API_URL),
      ENVAR_BLOCKCHAIN_NETWORK: JSON.stringify(process.env.BLOCKCHAIN_NETWORK),
      ENVAR_INFURA_NETWORK: JSON.stringify(process.env.INFURA_NETWORK),
      ENVAR_INFURA_API_KEY: JSON.stringify(process.env.INFURA_API_KEY),
      ENVAR_RANKING_REFRESH_TIME: JSON.stringify(process.env.RANKING_REFRESH_TIME)
    })
  ]
};

config.node = {
  fs: 'empty'
}

module.exports = config;
