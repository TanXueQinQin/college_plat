import request from '@/utils/request'
/**
 * 获取专利列表
 * @param {*} data
 * @returns
 */
export function getdemandList(data) {
    return request({
        url: `/proxy/college-backend/patent/cgdemandrelease/list`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

//添加备注
export function addRemark(data) {
    return request({
        url: `/proxy/college-backend/patent/cgdemandrelease/addRemark`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

//详情
export function getDemandDetail(data) {
    return request({
        url: `/proxy/college-backend/patent/cgdemandrelease/info/${data}`,
        method: 'post',
        data
    })
}