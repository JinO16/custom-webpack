function loader2(sourceCode) {
  console.log('join loader2');
  return sourceCode + `\n const loader2 = '19Qigfeng'`;
}

module.exports = loader2;