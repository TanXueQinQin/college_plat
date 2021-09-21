import request from '@/utils/request'
/**
 * 获取成交列表
 * @param {*} data
 * @returns
 */
export function getmakeRecordList(data) {
    return request({
        url: `/proxy/college-backend/patent/cgclinch/list`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

//新增、修改
export function addMakeRecord(data) {
    return request({
        url: `/proxy/college-backend/patent/cgclinch/save`,
        method: 'post',
        data
    })
}

//详情
export function getmakeRecord(data) {
    return request({
        url: `/proxy/college-backend/patent/cgclinch/info/${data}`,
        method: 'post',
        data
    })
}
//删除
export function delMakeRecord(data) {
    return request({
        url: `/proxy/college-backend/patent/cgclinch/delete`,
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
      url: `/proxy/college-backend/patent/cgclinch/exportClinchExportList`,
      responseType: 'blob',
      method: 'post',
      params: data
    })
  }