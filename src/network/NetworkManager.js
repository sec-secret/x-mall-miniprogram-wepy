import wepy from 'wepy'
import { getStore } from 'wepy-redux'

export const MALL_BASE_URL = 'https://www.xiaoguostore.com/gateway/mall';
export const AUTH_BASE_URL = 'https://www.xiaoguostore.com/gateway/auth';
export default class NetworkManager{
  static _instance = null
  timeout = 10 * 1000;
  delegate = null;

  static instance() {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  /**
   * 普通异常
   * @param {error} errorMessage
   * @param {number} code
   * @returns {Error}
   */
  static generalError(errorMessage, code) {
    let resultError = new Error(errorMessage);
    Reflect.defineProperty(resultError, 'errorCode', {value: code});
    return resultError;
  }

  /**
   * 没有登录异常
   * @param code
   * @returns {any}
   */
  static notLoginError(code) {
    let error = new Error('NotLogin');
    Reflect.defineProperty(error, 'errorCode', {value: code});
    return error;
  }

  fetchRequest(method, baseUrl, url, parameters, headers, otherObject, isStandard){
    let store = getStore();
    return new Promise((resolve, reject) => {
      wepy.request({
        method,
        url: baseUrl + url,
        data: {
          userId: store.getState().user.userInfo.userId,
          ...parameters
        },
        header: {
          'Accept': 'application/json',
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': store.getState().user.token,
          ...headers
        },
        success: function(res) {
          let responseJson = res.data;
          if (isStandard){
            if (!responseJson.errorCode) {
              resolve(responseJson.data);
            } else {
              let errorCode = responseJson.errorCode;
              if (errorCode === 10002) {
                let authorData = {
                  author: {},
                  hasAuthor: false,
                  token: ''
                };
                store.dispatch({type: 'UPDATE_AUTHOR_INFO', ...authorData});
                reject(NetworkManager.generalError(responseJson.message, responseJson.errorCode));
              } else if (errorCode === 10005) {
                resolve(responseJson.data);
              } else {
                reject(NetworkManager.generalError(responseJson.message, responseJson.errorCode));
              }
            }
          } else {
            if (!responseJson.errorCode) {
              resolve(responseJson);
            } else {
              if (responseJson.errorCode === 10005) {
                resolve(responseJson.data)
              } else {
                reject(NetworkManager.generalError(responseJson.message, responseJson.errorCode));
              }
            }
          }
        },
        fail: function (error) {
          reject(error);
        },
        ...otherObject
      })
    })
  }

  freedomPOST(baseUrl, url, parameters, headers, otherObject, isStandard = false) {
    return this.fetchRequest('POST', baseUrl, url, parameters, headers, otherObject, isStandard);
  }

  POST(url, parameters, headers, otherObject){
    return this.freedomPOST(MALL_BASE_URL, url, {
        ...this.getCarryData(),
        ...parameters
      },
      headers,
      {timeout: this.timeout, ...otherObject},
      true)
  }

  freedomGET(baseUrl, url, parameters, headers, otherObject, isStandard = false){
    return this.fetchRequest('GET', baseUrl, url, parameters, headers, otherObject, isStandard);
  }

  GET(url, parameters, headers, otherObject){
    return this.freedomGET(MALL_BASE_URL, url, {
        ...this.getCarryData(),
        ...parameters
      },
      headers,
      {timeout: this.timeout, ...otherObject},
      true)
  }

  getCarryData(){
    let carryData = null;
    if (this.delegate && this.delegate.carryData){
      if (typeof this.delegate.carryData === 'function'){
        carryData = this.delegate.carryData();
      }
      if (typeof this.delegate.carryData === 'object'){
        carryData = this.delegate.carryData;
      }
    }
    return carryData || {};
  }
}
