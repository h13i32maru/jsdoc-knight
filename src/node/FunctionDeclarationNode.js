import FunctionExpressionNode from './FunctionExpressionNode.js';

/**
 * @class
 * @classdesc represent FunctionDeclaration.
 * @extends FunctionExpressionNode
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
