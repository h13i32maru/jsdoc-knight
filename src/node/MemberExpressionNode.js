import assert from 'assert';
import ASTNode from './ASTNode.js';
import IdentifierNode from './IdentifierNode.js';

/**
 * @module node/MemberExpressionNode~MemberExpressionNode
 */

/**
 * @class
 * @extends node/ASTNode~ASTNode
 * @classdesc represent MemberExpression
 * @fileexample
 * // "window.foo"
 * let left  = new MemberExpressionNode(new IdentifierNode('window'), new IdentifierNode('foo'));
 */
export default class MemberExpressionNode extends ASTNode {
  /**
   * create instance.
   * @param {!(node/IdentifierNode~IdentifierNode|node/MemberExpressionNode~MemberExpressionNode)} parentNode
   * @param {!node/IdentifierNode~IdentifierNode} property
   */
  constructor(parentNode, property) {
    super();

    assert(parentNode, `parent object node must be specified. parentObjectNode = "${parentNode}"`);
    assert(parentNode instanceof IdentifierNode || parentNode instanceof MemberExpressionNode, `parent node must be MemberExpression or Identifier. type = "${parentNode}"`);
    assert(property instanceof IdentifierNode, `property must be specified. property = "${property}"`);

    this._node = {
      type: 'MemberExpression',
      property: property,
      object: parentNode
    };
  }
}
