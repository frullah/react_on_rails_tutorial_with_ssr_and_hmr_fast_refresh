process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const path = require('path')
const { devServer, inliningCss } = require('shakapacker')

const webpackConfig = require('./ServerClientOrBoth')

const developmentEnvOnly = (clientWebpackConfig, serverWebpackConfig) => {

  //plugins
  if (inliningCss ) {
    // Note, when this is run, we're building the server and client bundles in separate processes.
    // Thus, this plugin is not applied.
    const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
    clientWebpackConfig.plugins.push(
      new ReactRefreshWebpackPlugin({
        overlay:{
          sockPort: devServer.port
        }
      })
    )
  }

  clientWebpackConfig.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(__dirname, '../../tsconfig.json')
      },
      async: false
    })
  )
}
module.exports = webpackConfig(developmentEnvOnly)
