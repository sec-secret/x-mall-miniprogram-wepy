export default class SetTool{
  static intersectionSet(a, b, compare){
    compare = compare || ((a, b) => a === b);
    let intersectList = [];
    a.forEach(itemA => {
      b.forEach(itemB => {
        if (compare(itemA, itemB)){
          intersectList.push(itemA);
        }
      })
    })
    return intersectList;
  }
}
