import NetworkManager from './NetworkManager';

export default class NetworkManagerCategory extends NetworkManager{
    static moreCategories(){
        return this.instance().POST('/goods/getMoreCategories', {});
    }

    static secondCategories(parentId){
        return this.instance().POST('/goods/getSecondCategories', {parentId});
    }
}
