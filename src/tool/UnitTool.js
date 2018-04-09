/**
 * Created by cuppi on 2016/12/2.
 */

import NumberTool from './NumberTool';

class UnitTool {
  static formatPrice(price){
    return NumberTool.fixDigits(price, 2);
  }

  static formatFenPrice(price){
    return NumberTool.fixDigits(price/100, 2);
  }
}

export default UnitTool;
