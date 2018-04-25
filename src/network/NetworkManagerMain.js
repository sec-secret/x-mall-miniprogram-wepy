import NetworkManager from './NetworkManager';

export default class NetworkManagerMain extends NetworkManager{
    static main(){
        return this.instance().POST('/main', {});
    }
  static mallRecommend(catId, page) {
    return this.instance().POST('/main/randomGoods', {catId, page})
  }
}
