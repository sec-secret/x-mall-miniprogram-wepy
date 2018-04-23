import NetworkManager from './NetworkManager';

export default class NetworkManagerGoods extends NetworkManager{
  static goodsList(catId, lastKey) {
    return this.instance().POST('/goods/skus', {catId, lastKey})
  }
  static goodsDetail(skuId) {
    return this.instance().POST('/goods/getDetail', {skuId});
  }

  static goodsSimilar(skuId) {
    return this.instance().POST('/goods/similarSku', {skuId});
  }

  static goodsCheckSale(skuId) {
    return this.instance().POST('/goods/checkSale', {skuId});
  }

  static goodsState(skuId) {
    return this.instance().POST('/goods/skuState', {skuId});
  }

  static goodsPrice(skuId) {
    return this.instance().POST('/price/getNbPrice', {skuId});
  }

  static goodsImages(skuId){
    return this.instance().POST('/goods/skuImage', {skuId});
  }

  static goodsAddToCart(params) {
    return this.instance().POST('/order/addToShoppingCart', {'userId': 19, ...params}, {'Content-Type': 'application/json'})
    // return this.instance().POST('/order/addToShoppingCart', {'userId': GlobalConstant.store.state.userModule.user.userId, ...params})
  }
}
