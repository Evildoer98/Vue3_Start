import Axios from 'axios'
import {ElMessage} from 'element-plus'

const baseURL = 'https://github.com/Evildoer98/Vue3_Start'

const axios = Axios.create({
    baseURL,
    timeout: 2000   // 请求超时 2s
})

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
    (response) => {
        /**
         * 根据项目的情况对 config 做处理
         * 这里对 config 不做任何处理，直接返回
         */
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use (
    (response) => {
        return response
    },
    (error) => {
        if (error.response && error.response.data) {
          const code = error.response.status
          const msg = error.response.data.message
          ElMessage.error(`Code: ${code}, Message: ${msg}`)
          console.error(`[Axios Error]`, error.response)
        } else {
          ElMessage.error(`${error}`)
        }
        return Promise.reject(error)
    }
)

export default axios




