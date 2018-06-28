import NetworkManager from './NetworkManager';

export default class NetworkManagerCustomer extends NetworkManager {
  // 查看是否可以退货
  static fetchExpectComp(orderId, wzOrderId, skuId) {
    // 是否可以退货
    return this.instance().POST('/after/getCustomerExpectComp', {orderId, wzOrderId, skuId})
  }

  // 上传图片
  static uploadFiles(formData) {
    console.log(formData);
    return this.instance().POST('/after/uploadFiles', formData, {'Content-Type': 'multipart/form-data'})
  }

  // 退货
  static createAfsApply(params) {
    return this.instance().POST('/after/createAfsApply', params)
  }
}
