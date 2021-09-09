
const { SUCCESS } = require('../src/utils/responseCode')
const AGE = [{ value: '18', label: '18' }, { value: '19', label: '19' }]
const ANIMAL = [
  { value: 'dog', label: '狗' }, { value: 'cat', label: '猫' }
]
module.exports = [
  {
    url: '/options/age',
    method: 'get',
    response: () => {
      return {
        code: SUCCESS,
        data: AGE
      }
    }
  },
  {
    url: '/options/animal',
    method: 'get',
    response: config => {
      const { key } = config.query
      const data = ANIMAL.filter(item => {
        return item.value.indexOf(key) > -1
      })
      return {
        code: SUCCESS,
        data
      }
    }
  }
]