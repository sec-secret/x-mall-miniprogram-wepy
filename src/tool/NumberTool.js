'use strict';
const leftPad = function(str, len, ch){
    str = str + '';
    len = len - str.length;
    if (len <= 0) return str;
    if (!ch && ch !== 0) ch = ' ';
    ch = ch + '';
    return ch.repeat(len) + str;
}
/**
 * 数字工具类
 */
class NumberTool {
  /**
   * 整数补0
   * @param {number} number 整数
   * @param {number} length 最终的长度
   * @returns {string}  整数字符串
   */
  static zeroPad(number, length) {
    return leftPad(number, length, 0);
  }

  /**
   * 字符补位
   * @param {number | string} pad 字符
   * @param {number} length 最终的长度
   * @param {number, string} placeholder 补全字符
   * @returns {string}  字符串
   */
  static leftPad(pad, length, placeholder) {
    return leftPad(pad, length, placeholder);
  }

  /**
   * 小数部分有效数字保留
   * @param {number} number 数字
   * @param {number} digits 小数保留位数
   * @returns {string} 数字的字符串
   */
  static fixDigits(number, digits) {
    return Number(number).toFixed(digits);
  }

  /**
   * 返回正整数的字符串（非正整数返回指定字符串或空字符串）
   * @param {number} number 数字
   * @param {string} text 非正整数的返回（可空）
   * @returns {string} 正整数字符串或者指定字符串
   */
  static positiveText(number, text) {
    if (number <= 0) {
      return text ? text : '';
    } else {
      return number + '';
    }
  }

  /**
   * 返回指定数字的二进制形式列表
   * @param number 指定数字
   * @returns {number[]} 二进制形式列表
   */
  static bitListFromNumber(number){
    let bitList = [];
    while (number){
      let bit = number & 1;
      bitList.unshift(bit);
      number = number >> 1;
    }
    return bitList;
  }
}

export default NumberTool;
