import NetworkManager from "./NetworkManager";

export default class NetworkManagerCart extends NetworkManager{
    static addCart(params) {
        return this.instance().POST('/order/addToShoppingCart',  {'userId': 123, ...params}, {'Content-Type': 'application/json'})
    }

    static fetchCartGoods() {
        return this.instance().POST('/order/listShoppingCart', {userId: 123})
    }

    static deleteCartGoods(params) {
        return this.instance().POST('/order/deleteFromShoppingCart', {'userId': 123, ...params}, {'Content-Type': 'application/json'})
    }
}
