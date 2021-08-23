export function deepclone(oldObj) {
  if (typeof oldObj === 'object' && oldObj !== null) {//typeof null得到'object'
    var newObj = oldObj.constructor();//[]、{},这里原型链上的属性已经附上
    for (var key in oldObj) {
      if (Object.prototype.hasOwnProperty.call(oldObj, key)) {//只赋值自己的属性
        newObj[key] = deepclone(oldObj[key]);
      }
    }
    return newObj;
  }
  //递归出口，返回简单数据类型
  // 如果是regexp、和date，新建后返回
  if (oldObj instanceof Date) {
    return new Date(oldObj);
  }
  if (oldObj instanceof RegExp) {
    return new RegExp(oldObj);
  }
  return oldObj;
}
