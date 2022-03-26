/**
 * @description: 根据上下文动态注册view组件
 * @param {Function} files
 * @return {Object} 组件集合
 */
export function registerComponentByContext(files, limitArr) {
  const reg = /^.\/(.*).vue$/;
  const views = {};
  files.keys().forEach(key => {
    const name = reg.exec(key)[1];
    if (limitArr && limitArr.length > 0) {
      if (limitArr.includes(name)) {
        views[name] = files(key).default;
      }
    } else {
      views[name] = files(key).default;
    }
  });
  return views;
}
/**
 * @description 互相映射两个变量
 * @param {Array} arr
 * @return {Object}
 */
export function getMap(arr) {
  const mapR = {}; // -> 向右
  const mapL = {}; // <- 向左
  arr.forEach(item => {
    mapR[item[0]] = item[1];
    mapL[item[1]] = item[0];
  });
  return [mapR, mapL];
}

/**
 * @description 根据path（text1.text2.text3）创造对象
 * @param {String} path
 * @return {Object}
 */
export function createObjByPath(path) {
  const obj = {};
  const arr = path.split('.');
  if (arr.length > 1) {
    obj[arr[0]] = createObjByPath(arr.slice(1).join('.'));
  } else {
    obj[arr[0]] = '';
  }
  return obj;
}