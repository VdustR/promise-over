const path = require('path')

const configuration = {}
const configureWebpack = {}

const {
  BASE_URL,
  IS_DOC,
  IS_LIB
} = process.env

configuration.baseUrl = BASE_URL || '/'

configureWebpack.resolve = {
  alias: {
    'promise-over': path.resolve(__dirname, 'src'),
    Docs: path.resolve(__dirname, 'docs')
  }
}

if (IS_DOC) {
  configuration.outputDir = './dist-docs'
  configureWebpack.output = {
    filename: '[name]-[hash].js'
  }
  configureWebpack.entry = './docs/main.js'
}

if (IS_LIB) {
  configureWebpack.output = {
    libraryExport: 'default'
  }
}

configuration.configureWebpack = configureWebpack

module.exports = configuration
