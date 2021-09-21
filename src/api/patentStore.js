import request from '@/utils/request'
/**
 * 获取专利列表
 * @param {*} data
 * @returns
 */
export function getPatentList(data) {
    return request({
        url: `/proxy/college-backend/patent/cgpatent/list`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}
//上传图片
export function uploadImg(data) {
    return request({
        url: `/proxy/college-backend/cos/upload/uploadForTencent`,
        method: 'post',
        data
    })
}
//专利新增、修改
export function addPatent(data) {
    return request({
        url: `/proxy/college-backend/patent/cgpatent/save`,
        method: 'post',
        data
    })
}
//详情
export function getPatent(data) {
    return request({
        url: `/proxy/college-backend/patent/cgpatent/info/${data}`,
        method: 'post',
        data
    })
}
//删除
export function delPatent(data) {
    return request({
        url: `/proxy/college-backend/patent/cgpatent/delete`,
        method: 'post',
        data
    })
}

//查询法律状态
export function queryLawStatus(data) {
    return request({
        url: `/proxy/college-backend/patent/cgpatent/queryLawStatus`,
        method: 'post',
        data
    })
}
//查询专利类型
export function queryPatentType(data) {
    return request({
        url: `/proxy/college-backend/patent/cgpatent/queryPatentType`,
        method: 'post',
        data
    })
}
//查询维持状态
export function queryMaintainState(data) {
    return request({
        url: `/proxy/college-backend/patent/cgpatent/queryMaintainState`,
        method: 'post',
        data
    })
}

/**
 * 导出
 * @param {*} data
 * @returns
 */
 export function exportDetails(data) {
    return request({
      url: `/proxy/college-backend/patent/cgpatent/exportPatentList`,
      responseType: 'blob',
      method: 'post',
      params: data
    })
  }