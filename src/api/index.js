/**
 * Created by kukuchong on 2017/6/8.
 */
const baseUrl = "http://develop.oicp.io:8180/ebooks"
export const codeUrl = baseUrl + '/utils/verify_image'
export const phoneCodeUrl = baseUrl + '/utils/phone/code'
export const checkPhoneUrl = baseUrl +'/users/user/check_phone'
export const checkUserUrl = baseUrl +'/users/user/check_username'
export const registerUrl = baseUrl + '/users/user/register'
export const loginUrl = baseUrl + '/ins_users/user/login'
export const forgetPassUrl = baseUrl + '/users/user/forge_reset_password'
export const forgetSmUrl = baseUrl + '/users/user/forge_password'
export const checkPhoneCodeUrl= baseUrl + '/utils/phone/check_code'
export const menuUrl = baseUrl + '/users/current_user/menu'
export const currentUserUrl = baseUrl + '/users/current_user/info'

export const bookUrl = baseUrl + '/resources/resource'
export const bookDetailUrl=baseUrl + '/resources/resource/byId'

export const permissionListUrl = baseUrl + '/ins_admin_permission/group/list'
export const permissionDetailtUrl = baseUrl + '/ins_admin_permission/group/detail'
export const groupAddUrl = baseUrl + '/ins_admin_permission/group/add'
export const groupModifyUrl = baseUrl + '/ins_admin_permission/group/modify'
export const groupList = baseUrl + '/ins_admin_permission/group/list'

export const userListUrl = baseUrl + '/ins_admin_user/ins/list_user'
export const userAddUrl = baseUrl + '/ins_admin_user/ins/create_user'
export const userModifyUrl = baseUrl + '/admin_user/user/modify'
export const userStatusUrl = baseUrl + '/ins_admin_user/ins/change_status'
export const userImportUrl = baseUrl + '/ins_admin_user/ins/import_users'
export const userExportUrl = "http://develop.oicp.io:8180/ebooks/template/ins_import_user.xlsx"
export const userDeleteUrl = baseUrl + '/ins_admin_user/ins/delete_user'

export const deviceListUrl = baseUrl + '/ins_admin_screen/screen/list'

