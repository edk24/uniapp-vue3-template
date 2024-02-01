import request from '@/utils/request'

/**
 * 获取用户信息
 */
export const apiGetUser = () => {
    return request.get({
        url: '/api/user/get',
    })
}
