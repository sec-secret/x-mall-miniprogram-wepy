'use strict';

/**
 * 字符串工具类
 * @memberOf module:tool
 */
class StringTool {

  /**
   * 校验是否为手机号码
   * @param {string} mobile 手机号码
   * @returns {boolean} 结果
   */
  static isMobile(mobile) {
    return (/^1[345789]\d{9}$/.test(mobile));
  }

  /**
   * 校验是否为电话号码
   * @param {string} phone 电话号码
   * @returns {boolean} 结果
   */
  static isPhoneNumber(phone) {
    return /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/.test(phone);
  }

  /**
   * 检验是否为邮箱
   * @param {string} email 邮箱
   * @returns {boolean} 结果
   */
  static isEmail(email) {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(email);
  }

  /**
   * 校验是否为空字符串
   * @param {string} string 字符串
   * @returns {boolean} 结果
   */
  static isEmpty(string) {
    return !(string && string !== '');
  }

  /**
   * 校验是否为验证码（即0~9 6位数字）
   * @param {string} verifycode 验证码
   * @returns {boolean} 结果
   */
  static isVerifyCode(verifycode) {
    return (/^[0-9]{6}$/.test(verifycode));
  }

  /**
   * 校验是否为密码
   * @param {string} password 密码
   * @param {number} minLength 最小长度
   * @param {number} maxLength 最大长度
   * @returns {boolean} 结果
   */
  static isPassword(password, minLength, maxLength) {
    if (minLength !== undefined && maxLength !== undefined) {
      return new RegExp("^[a-zA-Z0-9]{" +
        minLength + "," + maxLength +
        "}$").test(password);
    }
    return (/^[a-zA-Z0-9]{6,14}$/.test(password));
  }

  /**
   * 去除数字左边所有0
   * @param c
   * @returns {*}
   */
  static numberRemoveLeftZero(c) {
    if (/^[0-9]*$/.test(c)) {
      return Number.parseInt(c) + '';
    }
    return c;
  }

  /**
   * 通过asc得出字符数值
   * @param {string} ascChar asc字符
   * @returns {number} 数值 A=0; B=1;
   */
  static numberFromASC(ascChar) {
    let asc = ascChar.charCodeAt(0);
    if (asc >= 65 && asc <= 90) {
      asc -= 65;
    } else if (asc >= 97 && asc <= 122) {
      asc -= 97;
    } else if (asc >= 48 && asc <= 57) {
      asc -= 48;
    } else {
      asc = 0;
    }
    return asc;
  }

  /**
   * 转换字符串到数字
   * @param {string} string 字符串
   * @param {boolean} force 是否强制转换非数字字符 (即为26进制数字)
   * @param {number} offset 非数字时的初始值
   * @returns {number} 数值
   */
  static numberFromString(string, force, offset) {
    if (/^[0-9]*$/.test(string)) {
      return Number.parseInt(string);
    }
    let sum = offset ? offset : 0;
    if (force) {
      for (let i = string.length - 1, radix = 1; i >= 0; i--, radix = radix * 26) {
        sum += StringTool.numberFromASC(string[i]) * radix;
      }
    }
    return sum;
  }

  /**
   * 清除所有空格字符
   * @param {string} string 字符串
   * @returns {string} 结果字符串
   */
  static clearSpace(string) {
    // 过滤空格
    return string.replace(/\s+/g, '');
  }

  /**
   * 清除所有逗号
   * @param {string} string 字符串
   * @returns {string} 结果字符串
   */
  static clearComma(string) {
    // 过滤空格
    return string.replace(/\u002c+/g, '').replace(/，+/g, '');
  }

  /**
   * 清除所有竖线
   * @param {string} string 字符串
   * @returns {string} 结果字符串
   */
  static clearVertical(string) {
    // 过滤空格
    return string.replace(/\|+/g, '');
  }

  /**
   * 清除所有特殊字符
   * @param {string} string 字符串
   * @returns {string} 结果字符串
   */
  static clearClutter(string) {
    let clearString = StringTool.clearSpace(string);
    clearString = StringTool.clearComma(clearString);
    clearString = StringTool.clearVertical(clearString);
    return clearString;
  }
}

export default StringTool;
