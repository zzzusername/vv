import request from './request';
import qs from "qs";

// 获取全部的模块条目（用于前端初始化下拉框）
export function getAllmoduleEntries(data) {
    return request({
        url: '/admin/api/v1/log/user_action/get_all_module_entries',
        method: 'post',
        data: data
    })
}
// 获取最新 信息
// /admin/api/v1/app_management/settings/get_latest_app_welcome_info
export function getLatestappWelcomeinfo(data) {
    return request({
        url: '/admin/api/v1/app_management/settings/get_app_welcome_info',
        method: 'post',
        data: data
    })
}

// addAppwelcomeInfo  保存
export function addAppwelcomeInfo(data) {
    return request({
        url: '/admin/api/v1/app_management/settings/add_app_welcome_info',
        method: 'post',
        data: data
    })
}
//  /admin/api/v1/app_management/settings/upload_app_welcome_image
// 上传 app 欢迎页图片
export function uploadAppwelcomeImage(data) {
    return request({
        url: '/admin/api/v1/app_management/settings/upload_app_welcome_image',
        method: 'post',
        data: data
    })
}

// 获取当前企业最新的h5升级信息
export function getLatesth5Upgradeinfo(data) {
    return request({
        url: '/admin/api/v1/app_management/settings/get_h5_upgrade_info',
        method: 'post',
        data: data
    })
}
// 上传 h5
export function uploadH5package(data) {
    return request({
        url: '/admin/api/v1/app_management/settings/upload_h5_package',
        method: 'post',
        data: data
    })
}
// 上传 h5
export function addH5upgradeInfo(data) {
    return request({
        url: '/admin/api/v1/app_management/settings/add_h5_upgrade_info',
        method: 'post',
        data: data
    })
}
// 二维码链接地址
export function getAppdownloadPageurl(data) {
    return request({
        url: '/admin/api/v1/app_management/settings/get_app_download_page_url',
        method: 'post',
        data: data
    })
}

/* 轮播图相关 */
//  列出APP轮播图信息
export function getBannerlist(data) {
    return request({
        url: '/admin/api/v1/app_management/banners/list',
        method: 'post',
        data: data
    })
}
// 删除
export function getBannerlistDelete(data) {
    return request({
        url: '/admin/api/v1/app_management/banners/delete',
        method: 'post',
        data: data
    })
}
// 新增
// /admin/api/v1/app_management/banners/add
export function addBannerlist(data) {
    return request({
        url: '/admin/api/v1/app_management/banners/add',
        method: 'post',
        data: data
    })
}
// 上传图片
export function bannersUploadimage(data) {
    return request({
        url: '/admin/api/v1/app_management/banners/upload_image',
        method: 'post',
        data: data
    })
}
// 启用状态
export function bannersSetenabled(data) {
    return request({
        url: '/admin/api/v1/app_management/banners/set_enabled',
        method: 'post',
        data: data
    })
}
// 修改
//   /admin/api/v1/app_management/banners/modify
export function bannersModify(data) {
    return request({
        url: '/admin/api/v1/app_management/banners/modify',
        method: 'post',
        data: data
    })
}
// 获取信息
export function bannersGetdata(data) {
    return request({
        url: '/admin/api/v1/app_management/banners/get',
        method: 'post',
        data: data
    })
}
//  /admin/api/v1/app_management/settings/get_app_name
export function settingsGetappName(data) {
    return request({
        url: '/admin/api/v1/app_management/settings/get_app_name',
        method: 'post',
        data: data
    })
}
// /admin/api/v1/app_management/settings/update_app_name
export function settingsUpdateappName(data) {
    return request({
        url: '/admin/api/v1/app_management/settings/update_app_name',
        method: 'post',
        data: data
    })
}
// /admin/api/v1/app_one_click_alarm_type/add
// 新增一键报警类别信息
export function appOneclickAlarmtypeAdd(data) {
    return request({
        url: '/admin/api/v1/app_one_click_alarm_type/add',
        method: 'post',
        data: data
    })
}
// 删除
// /admin/api/v1/app_one_click_alarm_type/delete
export function appOneclickAlarmtypeDelete(data) {
    return request({
        url: '/admin/api/v1/app_one_click_alarm_type/delete',
        method: 'post',
        data: data
    })
}
// 修改
//  /admin/api/v1/app_one_click_alarm_type/modify
export function appOneclickAlarmtypeModify(data) {
    return request({
        url: '/admin/api/v1/app_one_click_alarm_type/modify',
        method: 'post',
        data: data
    })
}
// /admin/api/v1/app_one_click_alarm_type/get
export function appOneclickAlarmtypeGet(data) {
    return request({
        url: '/admin/api/v1/app_one_click_alarm_type/get',
        method: 'post',
        data: data
    })
}
// /admin/api/v1/app_one_click_alarm_type/list
export function appOneclickAlarmtypeList(data) {
    return request({
        url: '/admin/api/v1/app_one_click_alarm_type/list',
        method: 'post',
        data: data
    })
}

/* app 模块管理 */

// 新增
// /admin/api/v1/app_management/app_fun_modules/add
export function appFunmodulesAdd(data) {
    return request({
        url: '/admin/api/v1/app_management/app_fun_modules/add',
        method: 'post',
        data: data
    })
}

// 删除
export function appFunmodulesDelete(data) {
    return request({
        url: '/admin/api/v1/app_management/app_fun_modules/delete',
        method: 'post',
        data: data
    })
}
// 获取详情
export function appFunmodulesGet(data) {
    return request({
        url: '/admin/api/v1/app_management/app_fun_modules/get',
        method: 'post',
        data: data
    })
}
// 列表
export function appFunmodulesList(data) {
    return request({
        url: '/admin/api/v1/app_management/app_fun_modules/list',
        method: 'post',
        data: data
    })
}
// 修改
// /admin/api/v1/app_management/app_fun_modules/modify
export function appFunmodulesModify(data) {
    return request({
        url: '/admin/api/v1/app_management/app_fun_modules/modify',
        method: 'post',
        data: data
    })
}
// 移动
export function appFunmodulesMove(data) {
    return request({
        url: '/admin/api/v1/app_management/app_fun_modules/move',
        method: 'post',
        data: data
    })
}
// 获取图片上传参数
export function getIconuploadProperties(data) {
    return request({
        url: '/admin/api/v1/app_management/app_fun_modules/get_icon_upload_properties',
        method: 'post',
        data: data
    })
}
// 设置功能模块是否启用
export function appFunmodulesSetenabled(data) {
    return request({
        url: '/admin/api/v1/app_management/app_fun_modules/set_enabled',
        method: 'post',
        data: data
    })
}
// 上传图标
export function appFunmodulesUploadicon(data) {
    return request({
        url: '/admin/api/v1/app_management/app_fun_modules/upload_icon',
        method: 'post',
        data: data
    })
}