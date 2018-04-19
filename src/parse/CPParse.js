import HtmlToJson from '../wxParse/html2json.js';
import css2json from './css2json';
export default class CPParse {
  static parse(nodeString){
    let htmlTree = HtmlToJson.html2json(nodeString, '');
    // console.log(JSON.stringify(htmlTree, ' ', ' '));
    // console.log('*****************************************************');
    let cssMapObject = {};
    /**
     * 单个节点简化转换实施者
     * @param tree 待转换节点
     * @returns {*} 转换后的节点
     */
    let simplifyBlock = (tree) => {
      let aimTree = {};
      if (tree.node === 'element' && tree.hasOwnProperty('tag')){
        if (tree.tag === 'style'){
          if (tree.hasOwnProperty('nodes') && tree.nodes.length > 0){
            let simpleCssMapObject = {...cssMapObject, ...css2json(tree.nodes[0].text)};
            let _cssMapObject = {};
            for (let key in simpleCssMapObject){
              if (simpleCssMapObject.hasOwnProperty(key)){
                _cssMapObject[key.replace(/\./g, '').split(' ').join('_')] = simpleCssMapObject[key];
              }
            }
            cssMapObject = _cssMapObject;
            // console.log(cssMapObject);
          }
          return null;
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
     */
    let simplifyNodeTree = (tree, aimTree) => {
      if (tree.hasOwnProperty('nodes')){
        for (let i = 0; i < tree.nodes.length; i++){
          if (!aimTree.hasOwnProperty('children')){
            aimTree.children = [];
          }
          let child = simplifyBlock(tree.nodes[i]);
          if (child){
            aimTree.children.push(child);
            simplifyNodeTree(tree.nodes[i], child);
          }
        }
      }
    }
    let aimTree = {};
    simplifyNodeTree(htmlTree, aimTree)
    /**
     * 样式匹配处理者
     * @param classesList DOM节点到当前深度样式层级列表
     * @param cssMapObject 所有样式映射对象
     * @returns {{}}
     */
    let matchSmartStyle = (classesList, cssMapObject) => {
      let style = {};
      let traverse = (coveredClesses, list, index) => {
        if (index === list.length){
          traverse.callback(coveredClesses);
          return;
        }
        traverse([...coveredClesses, ''], list, index + 1);
        let classes = list[index];
        for (let i = 0; i < classes.length; i++){
          let newCoveredList = [...coveredClesses, classes[i]]
          traverse(newCoveredList, list, index + 1);
        }
      }
      traverse.callback = (list) => {
        let currentTestClassesString = list.filter(_ => _ !== '').join('_');
        if (currentTestClassesString !== ''){
          if (cssMapObject.hasOwnProperty(currentTestClassesString)){
            style = {...style, ...cssMapObject[currentTestClassesString]}
          }
        }
      }
      traverse([], classesList, 0);
      return style;
    }
    /**
     * 递归对DOM节点进行'染色'
     * @param tree 当前树节点
     * @param parentClasses 所有父节点样式列表（某节点的样式为应用的class组成的列表）
     */
    let applyClass2Style = (tree, ...parentClasses) => {
      let classList = [];
      if (tree.hasOwnProperty('classList')){
        // console.log(parentClasses);
        classList = tree.classList;
        tree['parentClassList'] = [...parentClasses]
        let styleObject = matchSmartStyle([...parentClasses, classList], cssMapObject);
        tree['smartStyle'] = styleObject;
        let styleString = '';
        for (let key in styleObject){
          if (styleObject.hasOwnProperty(key)){
            styleString += `${key}: ${styleObject[key]};`;
          }
        }
        tree['attrs'] = {
          style: styleString
        }
      }

      if (tree.hasOwnProperty('children')){
        for (let i = 0; i < tree.children.length; i++){
          applyClass2Style(tree.children[i], ...parentClasses, classList);
        }
      }
    }
    applyClass2Style(aimTree, []);
    return aimTree;
  }
}
