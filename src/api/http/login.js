import Api from '../api.js'

export default {
  // 登陆
  login: async function(param) {
    const methodType = 'POST'
    const url = '/service-console/login'
    return await Api(methodType, url, param)
  },
    // 获取公钥
    getPublicKey: async function(param) {
        const methodType = 'GET'
        const url = '/service-console/rsa/public'
        return await Api(methodType, url, param)
    },
}
