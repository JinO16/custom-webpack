const path = require('path');
const PluginA = require('../plugins/plugin-a');
const PluginB = require('../plugins/plugin-b');

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './src/entry1.js'),
    second: path.resolve(__dirname, './src/entry2.js')
  },
  devtool: false,
  // 当前工作目录，也就是相对路径，entry和loader的所有相对路径都是相对于这个路径而言的
  context: process.cwd(),
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].js'
  },
  plugins: [new PluginA(), new PluginB()],
  // 针对引入依赖时，在没有书写文件后缀的情况下，webpack会自动帮我们按照传入的规则为文件添加后缀
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: [
          path.resolve(__dirname, '../loaders/loader-1.js'),
          path.resolve(__dirname, '../loaders/loader-2.js')
        ]
      }
    ]
  }
}