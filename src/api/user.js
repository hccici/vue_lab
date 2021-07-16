import request from '@utils/request'
function login(query) {
  return request({
    url: 'login',
    method: 'get',
    params: query
  })
}
export {
  login
}