const webpack = require('./webpack');
const config = require('../example/webpack.config');

// 1、初始化参数 根据配置文件和shell参数合成最终参数
const compiler = webpack(config);
// 2、 开始编译并执行
compiler.run((err, status) => {
  if (err) {
    console.error(err);
  }
})