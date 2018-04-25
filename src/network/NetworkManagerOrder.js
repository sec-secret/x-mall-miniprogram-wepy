import NetworkManager from "./NetworkManager";

export default class JNetworkMallOrder extends NetworkManager{
  static addCart(params) {
    return this.instance().POST('/order/addToShoppingCart', {'userId': 4, ...params}, {'Content-Type': 'application/json'})
  }

  static checkAreaLimit(req) {
    return this.instance().POST('/goods/checkAreaLimit', req, {'Content-Type': 'application/json'})
  }

  static submitOrder(params) {
    return this.instance().POST('/order/submitOrder', {'userId': 4, ...params}, {'Content-Type': 'application/json'})
  }

  static getFreight(params) {
    return this.instance().POST('/goods/getFreight', params, {'Content-Type': 'application/json'})
  }

  static fetchOrders(page, type) {
    return this.instance().POST('/order/list', {'userId': 4, ...{page, type}})
  }

  static cancelOrder(orderId) {
    return this.instance().POST('/order/cancelOrder', {'userId': 4, orderId})
  }

  static fetchOrderTrack(orderId) {
    return this.instance().POST('/order/orderTrack', {'userId': 4, orderId})
  }
}
