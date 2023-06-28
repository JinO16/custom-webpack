const fs = require('fs');

/**
 * 统一路径分隔符
 */

function toUnixPath(path) {
  return path.replace(/\\/g, '/');
}

/**
 * 
 * @param {*} modulePath 模块绝对路径
 * @param {*} extensions 扩展名数组
 * @param {*} originModulePath 原始引入模块路径
 * @param {*} moduleContext 模块上下文（当前模块所在目录）
 * @returns 模块绝对路径
 */
function tryExtensions(
  modulePath,
  extensions,
  originModulePath,
  moduleContext
) {
  // 优先尝试不需要扩展名选项
  extensions.unshift('');
  for (let extension of extensions) {
    if (fs.existsSync(modulePath + extension)) {
      return modulePath + extension;
    }
  }
  throw new Error (
    `No module, Error: Can't resolve ${originModulePath} in  ${moduleContext}`
  )
}

// 接受chunk作为参数，并且返回该chunk的源代码
/**
 * 
 * @param {*} chunk 
 * name 入口文件名称
 * entryModule 入口文件module对象
 * modules 依赖模块路径
 */
function getSourceCode(chunk) {
  const {name, entryModule, modules} = chunk;
  return `
    (() => {
      var __webpack_modules__ = {
        ${modules
          .map(module => {
          return `'${module.id}': (module) => {
            ${module._source}
          }`;
        }).join(',')}
      };
      // the module cache
      var __webpack_module_cache__ = {};
      // the require fuction
      function __webpack_require__(moduleId) {
        // check if module is in cache
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== undefined) {
          return cachedModule.exports;
        }
        // Create a new module (and put it into the cache)
        var module = (__webpack_module_cache__[moduleId] = {
          // no module.id needed
          // no module.loaded needed
          exports: {},
        });

        // Excute the module function
        __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

        // return the exports of the module
        return module.exports;
      }
      var __webpack_exports__ = {};
      // this entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
      (() => {
        ${entryModule._source}
      })();
    })();
  `
}

module.exports = {
  toUnixPath,
  tryExtensions,
  getSourceCode
}