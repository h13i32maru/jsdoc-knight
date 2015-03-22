import fs from 'fs-extra';
import path from 'path';
import espree from 'espree';
import escodegen from 'escodegen';
import FunctionDeclarationNode from './node/FunctionDeclarationNode.js';

/**
 * @classdesc Converter for JSDoc.
 * @class
 * @fileexample
 * let inDirPath process.argv[2];
 * let outDirPath process.argv[3];
 * Converter.convert(inDirPath, outDirPath);
 */
export default class Converter {
  /**
   * convert ES6 to ES5 for JSDoc.
   * @param {string} inDirPath input dir path from current dir.
   * @param {string} outDirPath output dir path from current dir.
   * @param {boolean} [debug=false]
   */
  static convert(inDirPath, outDirPath, debug = false) {
    this._walk(inDirPath, (filePath, content)=>{
      let code;
      try {
        code = this._generate(content);
        console.log('convert: ' + filePath);
      } catch(e) {
        console.error('fail convert: ' + filePath);
        if (debug) console.log(e.stack);
        return;
      }

      let outFileName = filePath.replace(inDirPath, './');
      let outFilePath = path.resolve(outDirPath, outFileName);
      fs.outputFileSync(outFilePath, code + '\n');
    });
  }

  /**
   * walk in directory.
   * @param {string} dirPath directory path.
   * @param {function} callback callback(filePath, fileContent).
   * @private
   */
  static _walk(dirPath, callback) {
    let entries = fs.readdirSync(dirPath);

    for (let entry of entries) {
      let entryPath = path.resolve(dirPath, entry);
      let stat = fs.statSync(entryPath);

      if (stat.isFile()) {
        let content = fs.readFileSync(entryPath, {encode: 'utf-8'});
        callback(entryPath, content);
      } else if (stat.isDirectory()) {
        this._walk(entryPath, callback);
      }
    }
  }

  /**
   * generate ES5 code from ES5 code.
   * @param {string} code ES6 code.
   * @returns {string} ES5 code.
   * @private
   */
  static _generate(code) {
    let ast6 = this._parse(code);
    let ast5 = {body:[], sourceType: 'script', type: 'Program'};

    let lastNode6 = ast6.body[ast6.body.length - 1];

    for (let node6 of ast6.body) {
      if (['ExportNamedDeclaration', 'ExportDefaultDeclaration'].includes(node6.type)) {
        let exportNode = node6;
        node6 = exportNode.declaration;
        node6.leadingComments = exportNode.leadingComments;
        node6.trailingComments = exportNode.trailingComments;
      }

      if (node6 !== lastNode6) {
        node6.trailingComments = [];
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

  /**
   * parse ES to AST.
   * @param {string} code ES code.
   * @returns {Object} AST
   * @private
   */
  static _parse(code) {
    return espree.parse(code, {
      comments: true,
      attachComment: true,
      ecmaFeatures: {
        arrowFunctions: true,
        blockBindings: true,
        destructuring: true,
        regexYFlag: true,
        regexUFlag: true,
        templateStrings: true,
        binaryLiterals: true,
        octalLiterals: true,
        unicodeCodePointEscapes: true,
        defaultParams: true,
        restParams: true,
        forOf: true,
        objectLiteralComputedProperties: true,
        objectLiteralShorthandMethods: true,
        objectLiteralShorthandProperties: true,
        objectLiteralDuplicateProperties: true,
        generators: true,
        spread: true,
        classes: true,
        modules: true,
        jsx: true,
        globalReturn: true
      }
    });
  }
}
