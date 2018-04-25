import NetworkManager from "./NetworkManager";

export default class NetworkManagerMine extends NetworkManager{
  static fetchAddressList() {
    return this.instance().POST('/account/addresses', {userId: 4});
  }

  static setDefaultAddress(id) {
    return this.instance().POST('/account/setDefaultAddress', {'userId': 4, ...id});
  }

  static getDefaultAddress() {
    return this.instance().POST('/account/getDefaultAddress', {'userId': 4});
  }

  static saveAddress(params) {
    return this.instance().POST('/account/saveAddress', {'userId': 4, ...params}, {'Content-Type': 'application/json'})
  }

  static deleteAddress(id) {
    return this.instance().POST('/account/deleteAddress', {'userId': 4, ...id})
  }
  static fetchProvince() {
    return this.instance().POST('/area/provinces');
  }

  static fetchCities(province) {
    return this.instance().POST('/area/cities', province);
  }

  static fetchCounties(city) {
    return this.instance().POST('/area/counties', city);
  }

  static fetchTowns(city) {
    return this.instance().POST('/area/towns', city);
  }

  static getUserInfo(code){
    return this.instance().POST('/login/getUserInfo', {code});
  }

  static userLogin(mobile, verifyCode, verifyKey, openId, nickName) {
    return this.instance().POST('/login/userlogin', {mobile, verifyCode, verifyKey, openId, nickName});
  }

  static getVerifyCode(mobile, openId) {
    return this.instance().POST('/login/getVerifyCode', {mobile, openId})
  }
}
