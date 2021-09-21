/**
 * Created by PanJiaChen on 16/11/18.
 */
import { deepClone } from './index'

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
/**
 * 判断是否为空
 */
export function validatenull(val) {
  // 特殊判断
  if (val && parseInt(val) === 0) return false
  const list = ['$parent']
  if (val instanceof Date || typeof val === 'boolean' || typeof val === 'number') return false
  if (val instanceof Array) {
    if (val.length === 0) return true
  } else if (val instanceof Object) {
    val = deepClone(val)
    list.forEach(ele => {
      delete val[ele]
    })
    for (var o in val) {
      return false
    }
    return true
  } else {
    if (
      val === 'null' ||
      val == null ||
      val === 'undefined' ||
      val === undefined ||
      val === ''
    ) {
      return true
    }
    return false
  }
  return false
}

/**
 * 验证是否存在true/false
 */
export const vaildData = (val, dafult) => {
  if (typeof val === 'boolean') {
    return val
  }
  return !validatenull(val) ? val : dafult
}
/**
 * 表单检验是否为手机号
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function formVaildPhone(rule, value, callback) {
  if (!value || value.length === 0) callback()
  if (window.$reg.mobile(value)) { callback() } else {
    callback(new Error())
  }
}
/**
 * 表单检验是否为身份证号
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validIdCard(rule, value, callback) {
  if (value) {
    const reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
    if (!reg.test(value)) {
      return callback(new Error('身份证号格式错误'))
    }
  }
  callback()
}
/**
 * 表单检验是否为邮箱
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function formVaildEmail(rule, value, callback) {
  if (!value || value.length === 0) callback()
  if (window.$reg.email(value)) { callback() } else {
    callback(new Error())
  }
}
/**
* 表单检验是否已填经营地址
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validateAddressTheSet(rule, value, callback) {
  if (value === '' || value === 0) return callback(new Error('经营范围不能为空'))
  if (value === 2) return callback(new Error('经营范围没有填写完整'))
  callback()
}
