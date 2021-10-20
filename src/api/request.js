import { getToken } from '@/utils/auth'
import axios from 'axios'
import { Toast } from 'vant'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // url = base url + request url
  timeout: 10000, // request timeout
})

request.interceptors.request.use(
  config => {
    config.headers.common['Authorization'] = getToken()
    return config
  },
  error => {
    console.error(error) // for debug
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  response => {
    const res = response.data
    return res.data
  },
  error => {
    console.error('响应错误：') // for debug
    console.dir(error)
    const message = (error.response.data && error.response.data.msg) || error.message || '啊哦，请求出错'
    Toast({
      message: message,
      type: 'text',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  },
)

export default request
