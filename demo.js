var WXBizDataCrypt = require('./WXBizDataCrypt')

var appId = 'wx58b1b582646001c0'
var sessionKey = '2LCIo8jkUW1x5zjNwhkGvA=='
var encryptedData = 'h+MXsgQ4bUfZiJzS9y92SmLVBCodMXPGhzoF7TWe/r3YVqF7sV0OMpuB7dsH3q16WW/VR3H8Av38ZmMNgkq8a13V43qwIeyTlVXpqLp0sCI3gn0mJKCjmq3CLy3XBoD8ua2HXSgVJ94yr/dVQjiYGw=='
var iv = 'RhO000bFNum4NjlK9C+KIQ=='

var pc = new WXBizDataCrypt(appId, sessionKey)

var data = pc.decryptData(encryptedData, iv)

console.log('解密后 data: ', data)
// 解密后的数据为
//
// data = {
//   "nickName": "Band",
//   "gender": 1,
//   "language": "zh_CN",
//   "city": "Guangzhou",
//   "province": "Guangdong",
//   "country": "CN",
//   "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
//   "unionId": "ocMvos6NjeKLIBqg5Mr9QjxrP1FA",
//   "watermark": {
//     "timestamp": 1477314187,
//     "appid": "wx4f4bc4dec97d474b"
//   }
// }
