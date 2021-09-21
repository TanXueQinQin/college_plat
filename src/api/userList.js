import request from '@/utils/request'
/**
 * 获取用户列表
 * @param {*} data
 * @returns
 */
export function getUserList(data) {
    return request({
        url: `/proxy/college-backend/syspc/userpc/list`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

//详情
export function getUserpcData(data) {
    return request({
        url: `/proxy/college-backend/syspc/userpc/info/${data}`,
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
      url: `/proxy/college-backend/syspc/userpc/exportSysUserList`,
      responseType: 'blob',
      method: 'post',
      params: data
    })
  }