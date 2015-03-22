import assert from 'assert';
import esquery from 'esquery';
import ASTNode from './ASTNode.js';
import IdentifierNode from './IdentifierNode.js';
import MemberExpressionNode from './MemberExpressionNode.js';
import AssignmentExpressionNode from './AssignmentExpressionNode.js';
import LiteralNode from './LiteralNode.js';

/**
 * @class
 * @classdesc represent FunctionExpression.
 * @extends ASTNode
 * @fileexample
 * // "function(){}"
 * let node = new FunctionExpressionNode();
 */
export default class FunctionExpressionNode extends ASTNode {
  /**
   * create instance.
   * @param {string} [name=null] function name.
   */
  constructor(name = null){
    super();
    this._node = {
      type: 'FunctionExpression',
      id: new IdentifierNode(name),
      rest: null,
      params: [],
      generator: false,
      expression: false,
      defaults: [],
      body: {
        body: [],
        type: 'BlockStatement'
      },
      leadingComments: [],
      trailingComments: []
    };
  }

  /**
   * update AST with class node.
   * @param {external:AST} classNode AST node of class.
   */
  updateByClass(classNode) {
    if (!classNode.leadingComments) classNode.leadingComments = [];

    this._node.id.name = classNode.id.name;
    this._node.leadingComments.push(...classNode.leadingComments);

    // constructor
    let constructorNode = esquery(classNode, '[key.name="constructor"]')[0];
    if (constructorNode) {
      this._mergeComment(this._node, constructorNode);
    }

    // static method
    {
      let nodes = esquery(classNode, 'MethodDefinition[kind="method"][static=/true/]');
      for (let node of nodes) {
        let left = new MemberExpressionNode(new IdentifierNode(classNode.id.name), new IdentifierNode(node.key.name));
        let right = new FunctionExpressionNode(node.key.name);
        let assignment = new AssignmentExpressionNode(left, '=', right);
        assignment.addComments(node.leadingComments);
        this._children.push(assignment);
      }
    }

    // static get and set
    {
      let getterNodes = esquery(classNode, 'MethodDefinition[kind="get"][static=/true/]');
      let setterNodes = esquery(classNode, 'MethodDefinition[kind="set"][static=/true/]');
      let ignored = [];

      for (let node of [...getterNodes, ...setterNodes]) {
        if (ignored.includes(node)) continue;

        if (node.kind === 'get') {
          let setterNode = esquery(classNode, `MethodDefinition[kind="set"][static=/true/][key.name=${node.key.name}]`)[0];
          if (setterNode) {
            this._mergeComment(node, setterNode);
            ignored.push(setterNode);
          }
        }

        let left = new MemberExpressionNode(new IdentifierNode(classNode.id.name), new IdentifierNode(node.key.name));
        let right = new LiteralNode(null);
        let assignment = new AssignmentExpressionNode(left, '=', right);
        assignment.addComments(node.leadingComments);
        this._children.push(assignment);
      }
    }

    // method
    {
      let nodes = esquery(classNode, 'MethodDefinition[kind="method"][static=/false/]');
      for (let node of nodes) {
        let parentNode = new MemberExpressionNode(new IdentifierNode(classNode.id.name), new IdentifierNode('prototype'));
        let left = new MemberExpressionNode(parentNode, new IdentifierNode(node.key.name));
        let right = new FunctionExpressionNode(node.key.name);
        let assignment = new AssignmentExpressionNode(left, '=', right);
        assignment.addComments(node.leadingComments);
        this._children.push(assignment);
      }
    }

    // get and set
    {
      let getterNodes = esquery(classNode, 'MethodDefinition[kind="get"][static=/false/]');
      let setterNodes = esquery(classNode, 'MethodDefinition[kind="set"][static=/false/]');
      let ignored = [];

      for (let node of [...getterNodes, ...setterNodes]) {
        if (ignored.includes(node)) continue;

        if (node.kind === 'get') {
          let setterNode = esquery(classNode, `MethodDefinition[kind="set"][static=/false/][key.name=${node.key.name}]`)[0];
          if (setterNode) {
            this._mergeComment(node, setterNode);
            ignored.push(setterNode);
          }
        }

        let parentNode = new MemberExpressionNode(new IdentifierNode(classNode.id.name), new IdentifierNode('prototype'));
        let left = new MemberExpressionNode(parentNode, new IdentifierNode(node.key.name));
        let right = new LiteralNode(null);
        let assignment = new AssignmentExpressionNode(left, '=', right);
        assignment.addComments(node.leadingComments);
        this._children.push(assignment);
      }
    }

    // trailing comment
    let lastNode = this._children[this._children.length - 1];
    if (lastNode) {
      lastNode.addComments(classNode.trailingComments, false);
    } else {
      this.addComments(classNode.trailingComments, false);
    }
  }
}
