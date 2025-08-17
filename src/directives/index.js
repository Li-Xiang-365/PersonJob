// 自动导入modules文件夹下的所有指令文件

// 使用require.context函数来动态导入所有指令文件
const modulesFiles = require.context("./modules", false, /\.js$/);
// 创建一个空的 directives 对象来存储所有导入的指令
const directives = modulesFiles.keys().reduce((modules, modulePath) => {
  // 获取文件名，如 './lazy.js' -> 'lazy'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  // 导入文件内容
  const value = modulesFiles(modulePath);
  // console.log(moduleName);
  // console.log(value);
  // 将导入的默认导出添加到 modules 对象中
  modules[moduleName] = value.default || value;
  return modules;
}, {});

// 导出一个默认对象
export default {
  // 在Vue实例中安装指令
  // Vue.use()方法会调用install方法
  install(Vue) {
    // 遍历指令对象中的所有键
    Object.keys(directives).forEach((key) => {
      // 将指令对象中的每个键值对作为指令注册到Vue实例中
      Vue.directive(key, directives[key]);
    });
  },
};

// export default {
//   install(Vue) {
//     Vue.directive('lazy', lazy)
//     Vue.directive('print', print)
//     .....
//   }
// }
