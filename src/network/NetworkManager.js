export default class NetworkManager{
    static _instance = null
    baseUrl = 'http://mall.beta.zookainet.com/b-nb-mall';
    timeout = 10 * 1000;
    delegate = null;

    static instance() {
        if (!this._instance) {
            this._instance = new this();
        }
        return this._instance;
    }

    /**
     * 普通异常
     * @param {error} errorMessage
     * @param {number} code
     * @returns {Error}
     */
    static generalError(errorMessage, code) {
        let resultError = new Error(errorMessage);
        Reflect.defineProperty(resultError, 'errorCode', {value: code});
        return resultError;
    }

    /**
     * 没有登录异常
     * @param code
     * @returns {any}
     */
    static notLoginError(code) {
        let error = new Error('NotLogin');
        Reflect.defineProperty(error, 'errorCode', {value: code});
        return error;
    }

    fetchRequest(method, baseUrl, url, parameters, headers, otherObject){
        return new Promise((resolve, reject) => {
            wx.request({
                method,
                url: baseUrl + url,
                data: {
                    ...parameters
                },
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    ...headers
                },
                success: function(res) {
                    let responseJson = res.data;
                    if (!responseJson.errorCode) {
                        resolve(responseJson.data);
                    } else {
                        let errorCode = responseJson.errorCode;
                        if (errorCode === 10022) {
                            reject(NetworkManager.notLoginError(100022));
                        } else {
                            reject(NetworkManager.generalError(responseJson.message, responseJson.errorCode));
                        }
                    }
                },
                fail: function (error) {
                    reject(error);
                },
                ...otherObject
            })
        })

    }

    freedomPOST(baseUrl, url, parameters, headers, otherObject) {
        return this.fetchRequest('POST', baseUrl, url, parameters, headers, otherObject);
    }

    POST(url, parameters, headers, otherObject){
        return this.freedomPOST(this.baseUrl, url, {
            ...this.getCarryData(),
            ...parameters
        }, headers, {timeout: this.timeout, ...otherObject})
    }

    getCarryData(){
        let carryData = null;
        if (this.delegate && this.delegate.carryData){
            if (typeof this.delegate.carryData === 'function'){
                carryData = this.delegate.carryData();
            }
            if (typeof this.delegate.carryData === 'object'){
                carryData = this.delegate.carryData;
            }
        }
        return carryData || {};
    }
}
