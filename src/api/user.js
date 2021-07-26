import request from '@utils/request'
function login(query) {
  return request({
    url: '/user/login',
    method: 'post',
    data: query
  })
}
export {
  login
}