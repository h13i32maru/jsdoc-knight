import ASTNode from './ASTNode.js';

/**
 * @module node/LiteralNode~LiteralNode
 */

/**
 * @class
 * @extends node/ASTNode~ASTNode
 * @classdesc represent Literal.
 * @fileexample
 * // "123"
 * let node = new LiteralNode(123);
 */
export default class LiteralNode extends ASTNode {
  /**
   * create instance.
   * @param {*} value
   */
  constructor(value) {
    super();

    this._node = {
      type: 'Literal',
      raw: '' + value,
      value: value
    };
  }
}
