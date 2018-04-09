import NetworkManager from "./NetworkManager";

export default class NetworkManagerCart extends NetworkManager{
    static addCart(params) {
        return this.instance().POST('/order/addToShoppingCart', params)
    }

    static fetchCartGoods(userId) {
        return this.instance().POST('/order/listShoppingCart', userId)
    }

    static deleteCartGoods(params) {
        return this.instance().POST('/order/deleteFromShoppingCart', params)
    }
}