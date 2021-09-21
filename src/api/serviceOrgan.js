import request from '@/utils/request'
/**
 * 获取机构列表
 * @param {*} data
 * @returns
 */
export function getcgagencyList(data) {
    return request({
        url: `/proxy/college-backend/agency/cgagency/list`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

//查询机构类型
export function queryGencyType(data) {
    return request({
        url: `/proxy/college-backend/agency/cgagency/queryGencyType`,
        method: 'post',
        data
    })
}
//新增、修改
export function addcgagency(data) {
    return request({
        url: `/proxy/college-backend/agency/cgagency/save`,
        method: 'post',
        data
    })
}
//详情
export function getcgagency(data) {
    return request({
        url: `/proxy/college-backend/agency/cgagency/info/${data}`,
        method: 'post',
        data
    })
}
//地址级联
export function selectAddressData(data) {
    return request({
        url: `/proxy/college-backend/sys/countries/selectData`,
        method: 'post',
        data
    })
}

//添加备注
export function addServiceOrganRemark(data) {
    return request({
        url: `/proxy/college-backend/agency/cgagency/addOrUpdateRemark`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}