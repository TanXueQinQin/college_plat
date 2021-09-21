import axios from 'axios'
import store from '@/store'
import { Message, MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'


// import { getToken } from '@/utils/auth'
// import { encode } from 'js-base64'
// let baseURL
// const env = process.env.NODE_ENV
// switch (env) {
//   case 'development': baseURL = ''; break
//   default: baseURL = process.env.VUE_APP_BASE_API
// }

// if()
// create an axios instance



const service = axios.create({
  /** 取消baseurl配置全部采用代理去进行处理跨域 */
  // baseURL: baseURL, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (getToken()) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers.Authorization = `Basic ${encode(
      //   `${clientId}:${clientSecret}`
      // )}`
      // config.headers['anxun-auth'] = `bearer ${getToken()}`
      config.headers['token'] = getToken()

    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    // code === 500 为系统错误，不能展示给用户
    if (res instanceof Blob) {
      return response
    } else{
      if (res.code === 401) {
         location.href="/login"
        //  this.$router.push('/login')
      }
      return res
    }
  },
  (error) => {
    console.log(error)
    console.log(error.response, '错误请求体')
    if (error.response.status === 413) {
      // to re-login
      MessageBox.confirm('当前账户已在其他地方登录,请确认后重试!', '温馨提示', {
        confirmButtonText: '确定',
        showCancelButton: false,
        // cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
      return Promise.reject(error)
    }

    const mes = error.response.data.msg
    Message({
      message: mes,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
