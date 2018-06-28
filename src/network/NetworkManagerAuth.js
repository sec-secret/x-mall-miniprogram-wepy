import NetworkManager, {AUTH_BASE_URL} from './NetworkManager'

export default class JNetworkMallAuth extends NetworkManager {
  static getVerifyCode(mobile) {
    return this.instance().freedomPOST(AUTH_BASE_URL, '/login/getVerifyCode', {mobile}, {}, {}, true)
  }

  static userLogin(authType, source, username, password = '', encryptedData, iv, openId = '', unionId = '', nickName = '', mobile = '', verifyKey = '') {
    return this.instance().freedomPOST(AUTH_BASE_URL, '/oauth/token', {
      grant_type: 'password',
      authType,
      username,
      password,
      openId,
      nickName,
      mobile,
      verifyKey,
      unionId,
      source,
      encryptedData,
      iv
    }, {'Authorization': 'Basic bmItc2VydmljZTpQSUFPaGFvMTkxQA=='}, {})
  }

  static getUserInfo(token) {
    return this.instance().freedomPOST(AUTH_BASE_URL, '/login/getUserInfo', {}, {'Authorization': token}, {}, true);
  }
}
