class PluginB {
  apply(compiler) {
    compiler.hooks.done.tap('Plugin B', () => {
      console.log('Plugin B');
    })
  }
}

module.exports = PluginB;