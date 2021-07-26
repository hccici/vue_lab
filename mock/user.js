const { SUCCESS, LOGIN_FAILED } = require('../src/utils/responseCode')
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/user/login',
    method: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: LOGIN_FAILED,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: SUCCESS,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info',
    method: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: LOGIN_FAILED,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: SUCCESS,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-element-admin/user/logout',
    method: 'post',
    response: () => {
      return {
        code: SUCCESS,
        data: 'success'
      }
    }
  }
]
