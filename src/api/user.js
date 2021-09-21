import request from '@/utils/request'
/**
 * 获取用户员工列表
 * @param {*} data
 * @returns
 */
export function login(data) {
    return request({
        url: `/proxy/college-backend/sys/user/login`,
        method: 'post',
        data
    })
}
//获取用户信息
export function geyUserInfo(data) {
    return request({
        url: `/proxy/college-backend/sys/user/info`,
        method: 'get',
        data
    })
}
//退出登录
export function logouts(data) {
    return request({
        url: `/proxy/college-backend/sys/user/logout`,
        method: 'post',
        data
    })
}