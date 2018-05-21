import NetworkManager, {AUTH_BASE_URL} from './NetworkManager'

export default class JNetworkMallAuth extends NetworkManager {
  static getVerifyCode(mobile) {
    return this.instance().freedomPOST(AUTH_BASE_URL, '/login/getVerifyCode', {mobile}, {}, {}, true)
  }

  static userLogin(authType, username, password = '', openId = '', nickName = '', mobile = '', verifyKey = '') {
    return this.instance().freedomPOST(AUTH_BASE_URL, '/oauth/token', {
      grant_type: 'password',
      authType,
      username,
      password,
      openId,
      nickName,
      mobile,
      verifyKey
    }, {'Authorization': 'Basic bmItc2VydmljZTpQSUFPaGFvMTkxQA=='}, {})
  }

  static getUserInfo(token) {
    return this.instance().freedomPOST(AUTH_BASE_URL, '/login/getUserInfo', {}, {'Authorization': token}, {}, true);
  }

  static miniprogramCode2Session(code) {
    return this.instance().freedomPOST(AUTH_BASE_URL, '/wxmini/miniUserInfoByCode', {code}, {}, {}, true)
  }

  static miniprogramDecrypt(sessionKey, encryptedData, iv) {
    return this.instance().freedomPOST(AUTH_BASE_URL, '/wxmini/miniDecrypt', {
      session_key: sessionKey,
      encryptedData: encryptedData,
      iv: iv
    }, {}, {}, true)
  }
}
