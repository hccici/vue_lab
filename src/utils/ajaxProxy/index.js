/* import { proxy } from "./proxy";
proxy({
    //请求发起前进入
    onRequest: (config, handler) => {
        console.log(config.url)
        handler.next(config);
    },
    //请求发生错误时进入，比如超时；注意，不包括http状态码错误，如404仍然会认为请求成功
    onError: (err, handler) => {
        console.log(err.type)
        handler.next(err)
    },
    //请求成功后进入
    onResponse: (response, handler) => {
        console.log(response.response)
        handler.next(response)
    }
}) */

/* import { hook } from "./hook";
hook({
  setRequestHeader(args, xhr) {
    xhr.setRequestHeader('hhj', 'ss')
  }
}) */
XMLHttpRequest.prototype._setRequestHeader = XMLHttpRequest.prototype.setRequestHeader
XMLHttpRequest.prototype.setRequestHeader = function (header, value) {
  if (header === 'x-csrf-token') {
    this._setRequestHeader(header, '123')
  } else {
    this._setRequestHeader(header, value)
  }
}