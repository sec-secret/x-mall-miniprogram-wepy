import NetworkManager from './NetworkManager';
import { getStore } from 'wepy-redux'

const store = getStore();
export default class NetworkManagerPayment extends NetworkManager {
  static applyPay(orderId, payType) {
    return this.instance().POST('/pay/applyPay', {openId: store.getState().user.userInfo.openId, orderId, payType})
  }
}
