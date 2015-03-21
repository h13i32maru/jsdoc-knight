import escodegen from 'escodegen';
import FunctionDeclarationNode from '../node/FunctionDeclarationNode.js';
import parse from './parse.js';

export default function generate(code) {
  var ast6 = parse(code);
  var ast5 = {body:[], sourceType: 'script', type: 'Program'};

  for (let node6 of ast6.body) {
    if (['ExportNamedDeclaration', 'ExportDefaultDeclaration'].includes(node6.type)) {
      let exportNode = node6;
      node6 = exportNode.declaration;
      node6.leadingComments = exportNode.leadingComments;
    }

    switch (node6.type) {
      case 'ClassDeclaration':
        let node5 = new FunctionDeclarationNode(node6.id.name);
        node5.updateByClass(node6);
        ast5.body.push(node5.node);
        ast5.body.push(...node5.children);
        break;
      case 'ImportDeclaration':
        break;
      default:
        if (node6.params) node6.params = [];
        if (node6.defaults) node6.defaults = [];
        node6.trailingComments = [];
        ast5.body.push(node6);
        break;
    }
  }

  return escodegen.generate(ast5, {comment: true});
}

