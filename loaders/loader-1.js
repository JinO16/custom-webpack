// loader本质上就是一个函数，接受一个入参（入参是我们的源代码），返回处理后的结果
function loader1(sourceCode) {
  console.log('join loader1');
  return sourceCode + `\n const loader1 = 'https://github.com/19Qingfeng'`;
}

module.exports = loader1;