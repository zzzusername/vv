import request from './request';
import qs from "qs";


/*  资源管理模块 接口 */

//  查询辅助服务区数据接口 
export function assistServerlist(data) {
    return request({
        url: '/super/admin/api/v1/resources_management/assist_server/list',
        method: 'post',
        data: data
    })
}
// 新增辅助服务器接口 
export function assistServer(data) {
    return request({
        url: '/super/admin/api/v1/resources_management/assist_server/add',
        method: 'post',
        data: data
    })
}








