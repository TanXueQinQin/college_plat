import request from '@/utils/request'
/**
 * 获取用户列表
 * @param {*} data
 * @returns
 */
export function getSysUserList(data) {
    return request({
        url: `/proxy/college-backend/sys/user/list`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

//新增用户
export function addUser(data) {
    return request({
        url: `/proxy/college-backend/sys/user/save`,
        method: 'post',
        data
    })
}
//修改用户
export function updateUser(data) {
    return request({
        url: `/proxy/college-backend/sys/user/update`,
        method: 'post',
        data
    })
}

//删除
export function dels(data) {
    return request({
        url: `/proxy/college-backend/sys/user/delete`,
        method: 'post',
        data
    })
}

//修改登录用户密码
export function updateUserPw(data) {
    return request({
        url: `/proxy/college-backend/sys/user/password`,
        method: 'post',
        data
    })
}