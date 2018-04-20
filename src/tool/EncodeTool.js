export default class EncodeTool{
  static decToHex(str){
    let res = [];
    for (let i = 0; i < str.length; i++){
      res[i] = ('00' + str.charCodeAt(i).toString(16)).slice(-4);
    }
    return '\\u' + res.join('\\u');
  }

  static ascii(str){
    let value = '';
    for (let i = 0; i < str.length; i++) {
      value += '\\&#x' + EncodeTool.leftZero4(parseInt(str.charCodeAt(i)).toString(16)) + ';';
    }
    return value;
  }

  static unicode(str){
    let value = '';
    for (let i = 0; i < str.length; i++) {
      value += '\\u' + EncodeTool.leftZero4(parseInt(str.charCodeAt(i)).toString(16));
    }
    return value;
  }

  static leftZero4(str) {
    if (str != null && str !== '' && str !== 'undefined') {
      if (str.length === 2) {
        return '00' + str;
      }
    }
    return str;
  }

  static unicode1(str){
    let value = '';
    for (let i = 0; i < str.length; i++){
      value += '&#' + str.charCodeAt(i) + ';';
    }
    return value;
  }

  static reconvert(str) {
    str = str.replace(/(\\u)(\w{1,4})/gi, function($0){
      return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g, '$2')), 16)));
    });
    str = str.replace(/(&#x)(\w{1,4});/gi, function($0){
      return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g, '$2'), 16));
    });
    str = str.replace(/(&#)(\d{1,6});/gi, function($0){
      return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g, '$2')));
    });
    return str;
  }
}
