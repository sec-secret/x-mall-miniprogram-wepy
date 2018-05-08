import NetworkManager from './NetworkManager';

export default class NetworkManagerOther extends NetworkManager{
  static mallSearch(req) {
    return this.instance().POST('/search/searchEsGoodsByPage', req, {'Content-Type': 'application/json'})
  }

  static mallSuggestions(query) {
    return this.instance().POST('/search/suggestions', {query})
  }

  static searchBySuggestions(req) {
    return this.instance().POST('/search/searchBySuggestions', req, {'Content-Type': 'application/json'})
  }
}
