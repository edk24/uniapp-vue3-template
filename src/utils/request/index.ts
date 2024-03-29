import HttpRequest from './http'
import { merge } from 'lodash-es'
import { HttpRequestOptions, RequestHooks } from './type'
import { getToken } from '../auth'
import { RequestCodeEnum, RequestMethodsEnum } from '@/enums/requestEnums'
import { useStaffStore } from '@/stores/user'
import { useMessage } from '../message'

const message = useMessage()

const requestHooks: RequestHooks = {
    requestInterceptorsHook(options, config) {
        const { urlPrefix, baseUrl, withToken, isAuth } = config
        options.header = options.header ?? {}
        if (urlPrefix) {
            options.url = `${urlPrefix}${options.url}`
        }
        if (baseUrl) {
            options.url = `${baseUrl}${options.url}`
        }
        const token = getToken()
        // 添加token
        if (withToken && !options.header.token) {
            options.header.token = token
        }
        return options
    },
    responseInterceptorsHook(response, config) {
        const { isTransformResponse, isReturnDefaultResponse, isAuth } = config

        //返回默认响应，当需要获取响应头及其他数据时可使用
        if (isReturnDefaultResponse) {
            return response
        }
        // 是否需要对数据进行处理
        if (!isTransformResponse) {
            return response.data
        }
        const staffStore = useStaffStore()
        const { code, data, msg, show } = response.data as any
        switch (code) {
            case RequestCodeEnum.SUCCESS:
                msg && show && message.toast(msg)
                return data
            case RequestCodeEnum.FAILED:
                message.toast(msg)
                return Promise.reject(msg)

            case RequestCodeEnum.TOKEN_INVALID:
                uni.showModal({
                    title: '提示',
                    content: '登录已过期，请重新登录',
                    showCancel: false,
                    confirmText: '确定'
                })
                    .then(() => { 
                        if (staffStore.token || uni.getStorageSync('app_token')) {
                            staffStore.logout()
                        }
                        uni.reLaunch({
                            url: '/pages/login/login',
                        })
                    })
                return Promise.reject()

            default:
                return data
        }
    },
    responseInterceptorsCatchHook(options, err) {
        if (options.method?.toUpperCase() == RequestMethodsEnum.POST) {
            // message.toast('请求失败，请重试' + JSON.stringify(err))
            // message.toast('请求失败, 请稍后再试~')
            console.log('🔥请求失败:', err, options)
        }
        return Promise.reject()
    },
}

const defaultOptions: HttpRequestOptions = {
    requestOptions: {
        timeout: 10 * 1000,
        header: { version: '1.0.0' },
    },
    baseUrl: `${import.meta.env.VITE_APP_BASE_URL || ''}/`,
    //是否返回默认的响应
    isReturnDefaultResponse: false,
    // 需要对返回数据进行处理
    isTransformResponse: true,
    // 接口拼接地址
    urlPrefix: '',
    // 忽略重复请求
    ignoreCancel: false,
    // 是否携带token
    withToken: true,
    isAuth: false,
    retryCount: 2,
    retryTimeout: 300,
    requestHooks: requestHooks,
}

function createRequest(opt?: HttpRequestOptions) {
    return new HttpRequest(
        // 深度合并
        merge(defaultOptions, opt || {})
    )
}
const request = createRequest()
export default request
