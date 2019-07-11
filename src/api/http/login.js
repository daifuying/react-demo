import Api from '../api.js'

export default {
  // 获取医生管理列表
  login: async function(param) {
    const methodType = 'POST'
    const url = '/service-console/login'
    return await Api(methodType, url, param)
  },
}
