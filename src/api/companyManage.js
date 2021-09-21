import request from '@/utils/request'
/**
 * 获取专利列表
 * @param {*} data
 * @returns
 */
export function getPriseschoolList(data) {
    return request({
        url: `/proxy/college-backend/enterprise/cgenterpriseschool/list`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

//专利新增、修改
export function addCompanyInfoData(data) {
    return request({
        url: `/proxy/college-backend/enterprise/cgenterpriseschool/save`,
        method: 'post',
        data
    })
}

//详情
export function getCompanyInfoData(data) {
    return request({
        url: `/proxy/college-backend/enterprise/cgenterpriseschool/info/${data}`,
        method: 'post',
        data
    })
}
//添加备注
export function addCompanyRemark(data) {
    return request({
        url: `/proxy/college-backend/enterprise/cgenterpriseschool/addRemark`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}