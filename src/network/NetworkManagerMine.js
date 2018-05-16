import NetworkManager from './NetworkManager';

export default class NetworkManagerMine extends NetworkManager{
  static fetchAddressList() {
    return this.instance().POST('/account/addresses');
  }

  static setDefaultAddress(id) {
    return this.instance().POST('/account/setDefaultAddress', {id});
  }

  static getDefaultAddress() {
    return this.instance().POST('/account/getDefaultAddress');
  }

  static saveAddress(params) {
    return this.instance().POST('/account/saveAddress', params, {'Content-Type': 'application/json'})
  }

  static deleteAddress(id) {
    return this.instance().POST('/account/deleteAddress', {id})
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
