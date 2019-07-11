import axios from 'axios'
import Notify from "zent/lib/notify";
//import router from '../router'
//import { Message, MessageBox, Loading } from 'element-ui'
let loading

/*function startLoading () {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
function endLoading () {
  loading.close()
}*/
axios.defaults.baseURL = 'https://arktest.boe.com.cn/v1';
let http = axios.create({
  baseURL: process.env.API_BASEURL,
  timeout: 10000,
  responseType: 'json',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
    st:'3bK9SofP8B/HwG1D2aRg1g==',
  },
  transformRequest: [
    function (data) {
      data = JSON.stringify(data)
      return data
    }
  ]
})

// POST传参序列化(添加请求拦截器)
http.interceptors.request.use(
  config => {
    // console.log('sessionStorage.ut222',sessionStorage.ut)
    config.headers.ut = localStorage.utDoctor?localStorage.utDoctor:sessionStorage.ut
    console.log(config)
    console.log(config.url)
    return config
  },
  error => {
      debugger
    console.log(error)
  }
)

// 返回状态判断(添加响应拦截器)
http.interceptors.response.use(
  res => {
    // 对响应数据做些事
    if (res.data && !res.data.success) {
    }
    if(res.config.url.indexOf("eye-api/eye/analysis/progress")== -1 && res.config.url.indexOf("eye-api/report/wechat/scanned")== -1)
    {
      //endLoading()
    }

    return res
  },
  error => {
      debugger
    if (
      error.response && error.response.status === 404 ||
      error.response && error.response.status === 403 ||
      error.response && error.response.status === 500 ||
      error.response && error.response.status === 505
    ) {
        Notify.error('网络超时或异常请重试');
    }
    /*Message({
      //  element提示框
      showClose: true,
      message: '网络超时或异常请重试',
      type: 'error'
    })*/
    return Promise.reject(error)
  }
)

async function httpProxy (methodType, url, params) {
  let returnData = await http({
    method: methodType,
    url: url,
    data: methodType === 'POST' ? params : null,
    params: methodType === 'GET' ? params : null
  })
    debugger
   switch (returnData.data.code) {
     case '0':
       return returnData.data
     case '500':
         Notify.error(returnData.data.msg);
       return returnData.data
     case '9999':
       break
     default:
         Notify.error('请输入BOE服务管理平台账号密码');
      /* Message({
         //  element提示框
         showClose: true,
         message: returnData.data.msg,
         type: 'error'
      })*/
      return returnData.data
  }
}

export default httpProxy
