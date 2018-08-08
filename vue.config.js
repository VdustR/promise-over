const path = require('path')

const configuration = {}
const configureWebpack = {}

configuration.baseUrl = process.env.BASE_URL || '/'

configureWebpack.resolve = {
  alias: {
    'promise-over': path.resolve(__dirname, 'src'),
    Docs: path.resolve(__dirname, 'docs')
  }
}

if (process.env.IS_DOC) {
  configureWebpack.output = {
    filename: '[name]-[hash].js'
  }
  configureWebpack.entry = './docs/main.js'
}

if (process.env.IS_LIB) {
  configureWebpack.output = {
    libraryExport: 'default'
  }
}

configuration.configureWebpack = configureWebpack

module.exports = configuration
