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

  static goodsComments(skuId) {
    return this.instance().POST('/goods/skuComments', {skuId});
  }

  static goodsCheckSale(req) {
    // 可售信息
    return this.instance().POST('/goods/checkSale', req, {'Content-Type': 'application/json'});
  }

  static goodsState(req) {
    // 上下架信息
    return this.instance().POST('/goods/skuState', req, {'Content-type': 'application/json'});
  }

  static goodsPrice(skuId) {
    return this.instance().POST('/price/getNbPrice', {skuId});
  }

  static goodsImages(skuId){
    return this.instance().POST('/goods/skuImage', {skuId});
  }

  static goodsAddToCart(req) {
    return this.instance().POST('/order/addToShoppingCart', req, {'Content-Type': 'application/json'})
    // return this.instance().POST('/order/addToShoppingCart', {'userId': GlobalConstant.store.state.userModule.user.userId, ...params})
  }
}
