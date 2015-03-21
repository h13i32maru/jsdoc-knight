import FunctionExpressionNode from './FunctionExpressionNode.js';

/**
 * @module node/FunctionDeclarationNode
 */

/**
 * @class
 * @classdesc represent FunctionDeclaration.
 * @extends node/FunctionExpressionNode~FunctionExpressionNode
 * @fileexample
 * // "function myFunction(){}"
 * let node = new FunctionDeclarationNode('myFunction');
 */
export default class FunctionDeclarationNode extends FunctionExpressionNode{
  /**
   * create instance.
   * @param {!string} name function name.
   */
  constructor(name){
    super(name);
    this._node.type = 'FunctionDeclaration';
  }
}
