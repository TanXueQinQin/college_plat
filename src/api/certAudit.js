import request from '@/utils/request'
/**
 * 获取用户列表
 * @param {*} data
 * @returns
 */
export function getCertificationList(data) {
    return request({
        url: `/proxy/college-backend/syspc/userpc/certificationList`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}
//通过 驳回
export function addCompanyInfoData(data) {
    return request({
        url: `/proxy/college-backend/syspc/userpc/certificationAudit`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

//删除
export function dels(data) {
    return request({
        url: `/proxy/college-backend/syspc/userpc/sysUserDelete`,
        method: 'post',
        data
    })
}