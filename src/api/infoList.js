import request from '@/utils/request'
/**
 * 获取资讯列表
 * @param {*} data
 * @returns
 */
export function getnewsList(data) {
    return request({
        url: `/proxy/college-backend/news/cgnews/list`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

//查询文章类型
export function queryNewType(data) {
    return request({
        url: `/proxy/college-backend/news/cgnews/queryNewType`,
        method: 'post',
        data
    })
}
//新增、修改
export function addInfodata(data) {
    return request({
        url: `/proxy/college-backend/news/cgnews/save`,
        method: 'post',
        data
    })
}
//详情
export function getInfoData(data) {
    return request({
        url: `/proxy/college-backend/news/cgnews/info/${data}`,
        method: 'post',
        data
    })
}

//删除
export function delInfo(data) {
    return request({
        url: `/proxy/college-backend/news/cgnews/delete`,
        method: 'post',
        data
    })
}