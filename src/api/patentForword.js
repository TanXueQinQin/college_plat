import request from '@/utils/request'
/**
 * 获取专利列表
 * @param {*} data
 * @returns
 */
export function getPatentFrowordList(data) {
    return request({
        url: `/proxy/college-backend/patent/cgpatentappointment/reservationList`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}
//详情
export function getPatentDetail(data) {
    return request({
        url: `/proxy/college-backend/patent/cgpatentappointment/info/${data}`,
        method: 'post',
        data
    })
}
//删除
export function delPatentForword(data) {
    return request({
        url: `/proxy/college-backend/patent/cgpatentappointment/delete`,
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
      url: `/proxy/college-backend/patent/cgpatentappointment/exportPatentappointmenList`,
      responseType: 'blob',
      method: 'post',
      params: data
    })
  }