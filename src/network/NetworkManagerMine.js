import NetworkManager from './NetworkManager';
import wepy from 'wepy'

export default class NetworkManagerMine extends NetworkManager{
  static fetchAddressList() {
    return this.instance().POST('/account/addresses', {userId: wepy.userInfo.userId});
  }

  static setDefaultAddress(id) {
    return this.instance().POST('/account/setDefaultAddress', {'userId': wepy.userInfo.userId, ...id});
  }

  static getDefaultAddress() {
    return this.instance().POST('/account/getDefaultAddress', {'userId': wepy.userInfo.userId});
  }

  static saveAddress(params) {
    return this.instance().POST('/account/saveAddress', {'userId': wepy.userInfo.userId, ...params}, {'Content-Type': 'application/json'})
  }

  static deleteAddress(id) {
    return this.instance().POST('/account/deleteAddress', {'userId': wepy.userInfo.userId, ...id})
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
}
