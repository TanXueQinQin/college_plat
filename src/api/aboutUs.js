import request from '@/utils/request'

//专利新增、修改
export function addUserInfo(data) {
    return request({
        url: `/proxy/college-backend/about/cgaboutus/saveOrUpdate`,
        method: 'post',
        data
    })
}
//查询
export function getAboutUs(data) {
    return request({
        url: `/proxy/college-backend/about/cgaboutus/queryAbout`,
        method: 'post',
        data
    })
}