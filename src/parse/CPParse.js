import HtmlToJson from '../wxParse/html2json.js';
import css2json from './css2json';

const NOT_INHERIT_PROPERTY_LIST = ['width']

export default class CPParse {
  /**
   * 使用特定方式解析css
   * @param cssString css字符串
   * @param keyNomenclature 解析命名法 0: 基本命名法 1: 驼峰命名法 2: 下划线命名法 3: 竖线命名法
   * @returns {{}}
   * @private
   */
  static parseCss(cssString, keyNomenclature = 0){
    let simpleCssMapObject = css2json(cssString);
    let _cssMapObject = {};
    for (let key in simpleCssMapObject){
      if (simpleCssMapObject.hasOwnProperty(key)){
        let resultKey = key;
        if (keyNomenclature === 1){
          // TODO: 准备实现
        }

        if (keyNomenclature === 2){
          resultKey = key.replace(/\./g, '').split(' ').join('_');
        }

        if (keyNomenclature === 3){
          resultKey = key.replace(/\./g, '').split(' ').join('|');
        }

        _cssMapObject[resultKey] = simpleCssMapObject[key];
      }
    }
    return _cssMapObject;
  }

  static applyCss2Node(tree, cssMapObjectOrString){
    console.log(cssMapObjectOrString)
    let cssMapObject = cssMapObjectOrString;
    if (typeof cssMapObjectOrString === 'string'){
      cssMapObject = CPParse.parseCss(cssMapObjectOrString, 3);
    }
    /**
     * 样式匹配处理者
     * @param classesList DOM节点到当前深度样式层级列表
     * @param cssMapObject 所有样式映射对象
     * @returns {{}}
     */
    let matchSmartStyle = (classesList, cssMapObject) => {
      let style = {};
      let traverse = (coveredClasses, list, index) => {
        if (index === list.length){
          let isInherit = list[list.length - 1].indexOf(coveredClasses[coveredClasses.length - 1]) === -1;
          traverse.callback(coveredClasses, isInherit);
          return;
        }
        traverse([...coveredClasses, ''], list, index + 1);
        let classes = list[index];
        for (let i = 0; i < classes.length; i++){
          let newCoveredList = [...coveredClasses, classes[i]]
          traverse(newCoveredList, list, index + 1);
        }
      }
      traverse.callback = (coveredClasses, isInherit = true) => {
        let currentTestClassesString = coveredClasses.filter(_ => _ && _ !== '').join('|');
        if (currentTestClassesString !== ''){
          if (cssMapObject.hasOwnProperty(currentTestClassesString)){
            style = {...style, ...cssMapObject[currentTestClassesString]}
            if (isInherit){
              NOT_INHERIT_PROPERTY_LIST.forEach(property => {
                if (style.hasOwnProperty(property)){
                  delete style[property]
                }
              })
            }
          }
        }
      }
      traverse([], classesList, 0);
      return style;
    };
    /**
     * 递归对DOM节点进行'染色'
     * @param tree 当前树节点
     * @param parentClasses 所有父节点样式列表（某节点的样式为应用的class组成的列表）
     */
    let applyClass2Style = (tree, ...parentClasses) => {
      let classList = [tree.name];
      if (tree.hasOwnProperty('classList')){
        classList = [...classList, ...tree.classList];
      }
      tree['parentClassList'] = [...parentClasses]
      let styleObject = matchSmartStyle([...parentClasses, classList], cssMapObject);

      for (let key in styleObject){
        if (styleObject.hasOwnProperty(key)){
          if (/.*px$/g.test(styleObject[key])){
            let number = parseInt(styleObject[key].replace(/px/g, ''));
            styleObject[key] = number + 'px';
          }
        }
      }
      tree['smartStyle'] = styleObject;
      let styleString = '';
      for (let key in styleObject){
        if (styleObject.hasOwnProperty(key)){
          styleString += `${key}: ${styleObject[key]};`;
        }
      }
      tree['attrs'] = {
        ...(tree['attrs'] || {}),
        style: styleString
      }

      if (tree.hasOwnProperty('children')){
        for (let i = 0; i < tree.children.length; i++){
          applyClass2Style(tree.children[i], ...parentClasses, classList);
        }
      }
    }
    applyClass2Style(tree, []);
  }

  static parseString(nodeString, cssStyleString = ''){
    let htmlTree = HtmlToJson.html2json(nodeString, '');
    // console.log(JSON.stringify(htmlTree, ' ', ' '));
    // console.log('*****************************************************');
    let cssMapObject = {};
    if (cssStyleString && cssStyleString !== ''){
      cssMapObject = {...cssMapObject, ...CPParse.parseCss(cssStyleString, 3)};
    }
    let aimTree = {};
    CPParse._simplifyNodeTree(htmlTree, aimTree, styleString => {
      cssMapObject = {...cssMapObject, ...CPParse.parseCss(styleString, 3)};
    })
    CPParse.applyCss2Node(aimTree, cssMapObject);
    return aimTree;
  }

  /**
   * 单个节点简化转换实施者
   * @param tree 待转换节点
   * @returns {*} 转换后的节点
   */
  static _simplifyBlock(tree){
    let aimTree = {};
    if (tree.node === 'element' && tree.hasOwnProperty('tag')){
      if (tree.tag === 'style'){
        if (tree.hasOwnProperty('nodes') && tree.nodes.length > 0){
          let text = '';
          tree.nodes.forEach(styleEle => {
            text += styleEle.text;
          })
          aimTree['text'] = text;
          // console.log(cssMapObject);
        }
        return null;
      }
      if (tree.tag === 'link'){
        aimTree['href'] = tree.attr.href
      }
      if (tree.tag === 'img'){
        aimTree['attrs'] = {
          src: tree.attr.src
        }
      }
      if (tree.tag === 'th'){
        aimTree['attrs'] = {
          colspan: tree.attr.colspan
        }
      }
      aimTree['name'] = tree.tag;
    }
    if (tree.node === 'text'){
      aimTree['type'] = 'text';
      aimTree['text'] = tree.text;
    }
    if (tree.hasOwnProperty('classStr')){
      aimTree['classList'] = tree.classStr.split(' ');
    }
    return aimTree;
  }

  /**
   * 递归简化伪DOM树结构
   * @param tree 当前源树的节点
   * @param aimTree 当前目标树的节点
   * @param styleStringCallback style标签回调
   */
  static _simplifyNodeTree(tree, aimTree, styleStringCallback){
    if (tree.hasOwnProperty('nodes')){
      for (let i = 0; i < tree.nodes.length; i++){
        if (!aimTree.hasOwnProperty('children')){
          aimTree.children = [];
        }
        let child = CPParse._simplifyBlock(tree.nodes[i]);
        if (child){
          if (styleStringCallback && child.name === 'style'){
            styleStringCallback(child.text);
          }
          aimTree.children.push(child);
          CPParse._simplifyNodeTree(tree.nodes[i], child);
        }
      }
    }
  }
}
