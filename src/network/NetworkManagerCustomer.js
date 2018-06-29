import NetworkManager, {MALL_BASE_URL} from './NetworkManager';
import wepy from 'wepy';
import { getStore } from 'wepy-redux'

export default class NetworkManagerCustomer extends NetworkManager {
  // 查看是否可以退货
  static fetchExpectComp(orderId, wzOrderId, skuId) {
    // 是否可以退货
    return this.instance().POST('/after/getCustomerExpectComp', {orderId, wzOrderId, skuId})
  }

  // 上传图片
  static uploadFiles(files, formData) {
    let store = getStore();
    return new Promise((resolve, reject) => {
      console.log(files[0])
      wepy.uploadFile({
        url: MALL_BASE_URL + '/after/uploadFiles',
        filePath: files[0],
        name: 'image',
        header: {
          'Authorization': store.getState().user.token,
          'Content-Type': 'multipart/form-data'
        },
        formData: formData,
        success: function(res){
          console.log(res);
          resolve(res)
        },
        fail: function (err) {
          console.log(err)
          reject(err)
        }
      })
    })
  }

  // 退货
  static createAfsApply(params) {
    return this.instance().POST('/after/createAfsApply', params)
  }
}
