import request from '@utils/request'
function getAge(query) {
  return request({
    url: '/options/age',
    method: 'get',
    data: query
  })
}
function getAnimal(query) {
  return request({
    url: '/options/animal',
    method: 'get',
    params: query
  })
}
export {
  getAge,
  getAnimal
}