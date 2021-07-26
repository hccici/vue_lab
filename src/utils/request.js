import axios from "axios";
// import store from '@/store'
import { MessageBox, Message } from 'element-ui'
const { SUCCESS, LOGIN_FAILED } = require('./responseCode')

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: process.env.VUE_APP_TIMEOUT
})
// 在发送请求前先做一些处理
service.interceptors.request.use(req => {
  // 全局存token，如果有就调用它，以便其它需要token的接口使用
  // if (store.getter.token) {
  //   req.headers['selfToken'] = store.getter.token
  // }
  return req
}, err => {
  // 处理请求失败的情况，例如请求超时，没有网等
  return Promise.reject(err)
})

// 对返回结果做一些统一的处理
service.interceptors.response.use(resp => {
  // 只处理后端返回来的数据，不关心其它的公共数据
  const res = resp.data
  // if the custom code is not 20000, it is judged as an error.
  if (res.code !== SUCCESS) {
    Message({
      message: res.message || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    // 没有登录token，去重新登录
    if (res.code === LOGIN_FAILED) {
      MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        confirmButtonText: 'Re-Login',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        // 重新获取token
        // store.dispatch('user/resetToken').then(() => {
        //   location.reload()
        // })
      })
    }
    return Promise.reject(new Error(res.message || 'Error'))
  } else {
    return res
  }
}, err => {
  // 处理返回结果错误，例如服务器错误，找不到资源等
  Message({
    message: err.message,
    type: 'error',
    duration: 5 * 1000
  })
  // 返回去，进行进一步的处理
  return Promise.reject(err)
})
export default service