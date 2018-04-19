import HtmlToJson from '../wxParse/html2json.js';
import WxParse from '../wxParse/wxParse'
import css2json from './css2json';
export default class CPParse {
  static parse(nodeString){
    let htmlTree = WxParse.wxParse('testRictText', 'html', nodeString, this)
    // console.log(JSON.stringify(htmlTree, ' ', ' '));
    // console.log('*****************************************************');
    let cssMapObject = {};
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
            console.log(cssMapObject);
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
            // styleString += key + ':' + styleObject[key] + ';';
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
    console.log(JSON.stringify(aimTree, ' ', ' '));
    return aimTree;
  }
}
