import ASTNode from './ASTNode.js';
import assert from 'assert';

/**
 * @module node/IdentifierNode
 */

/**
 * @class
 * @extends node/ASTNode~ASTNode
 * @classdesc represent IdentifierNode.
 * @fileexample
 * // "foo"
 * let node = new IdentifierNode('foo');
 */
export default class IdentifierNode extends ASTNode {
  /**
   * create instance.
   * @param {!string} name identifier name.
   */
  constructor(name) {
    super();

    assert(name, `name must be specified. name = "${name}"`);
    this._node = {type: 'Identifier', name: name};
  }
}
