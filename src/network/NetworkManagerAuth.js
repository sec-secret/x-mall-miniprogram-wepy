import NetworkManager from "./NetworkManager";

export default class JNetworkMallAuth extends NetworkManager{
  static getUserInfo(code){
    return this.instance().freedomPOST('http://mall.beta.zookainet.com/gateway/auth/login/getUserInfo', {code});
  }

  // static userLogin(mobile, verifyCode, verifyKey, openId, nickName) {
  //   return this.instance().POST('/oauth/token', {mobile, verifyCode, verifyKey, openId, nickName}, {}, {urlType: 'auth'});
  // }

  static userLogin(grant_type, username, password) {
    return this.instance().freedomPOST('http://mall.beta.zookainet.com/gateway/auth/oauth/token', {grant_type, username, password});
  }
  // grant_type      固定  password
  // username      传手机号
  // password       传openId

  static getVerifyCode(mobile, openId) {
    return this.instance().freedomPOST('http://mall.beta.zookainet.com/gateway/auth/login/getVerifyCode', {mobile, openId})
  }

  static miniprogramCode2Session(code){
    return this.instance().freedomPOST('http://10.1.1.63:7000', '/wxmini/miniUserInfoByCode', {code}, {}, {}, true)
  }

  static miniprogramDecrypt(sessionKey, encryptedData, iv){
    return this.instance().freedomPOST('http://10.1.1.63:7000', '/wxmini/miniDecrypt', {
      session_key: sessionKey,
      encryptedData: encryptedData,
      iv: iv
    }, {}, {}, true)
  }
}
