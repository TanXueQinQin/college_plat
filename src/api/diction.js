import request from '@/utils/request'
/**
 * 获取字典列表
 * @param {*} data
 * @returns
 */
export function getSysdictList(data) {
    return request({
        url: `/proxy/college-backend/sys/sysdict/list`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

//新增
export function addDiction(data) {
    return request({
        url: `/proxy/college-backend/sys/sysdict/save`,
        method: 'post',
        data
    })
}

//修改
export function updateDiction(data) {
    return request({
        url: `/proxy/college-backend/sys/sysdict/update`,
        method: 'post',
        data
    })
}


//删除
export function delDiction(data) {
    return request({
        url: `/proxy/college-backend/sys/sysdict/delete`,
        method: 'post',
        data
    })
}