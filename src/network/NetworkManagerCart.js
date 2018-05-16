import NetworkManager from './NetworkManager';

export default class NetworkManagerCart extends NetworkManager{
    static addCart(params) {
        return this.instance().POST('/order/addToShoppingCart', params, {'Content-Type': 'application/json'})
    }

    static fetchCartGoods() {
        return this.instance().POST('/order/listShoppingCart')
    }

    static deleteCartGoods(params) {
        return this.instance().POST('/order/deleteFromShoppingCart', params, {'Content-Type': 'application/json'})
    }
}
