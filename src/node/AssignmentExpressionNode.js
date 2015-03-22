import assert from 'assert';
import ASTNode from './ASTNode.js';
import MemberExpressionNode from './MemberExpressionNode.js';

/**
 * @class
 * @extends ASTNode
 * @classdesc represent AssignmentExpression.
 * now only "=" assignment.
 * @fileexample
 * // "window.foo = 123"
 * let left  = new MemberExpressionNode(new IdentifierNode('window'), new IdentifierNode('foo'));
 * let right = new LiteralNode(123);
 * let node  = AssignmentExpressionNode(left, '=', right);
 */
export default class AssignmentExpressionNode extends ASTNode {
  /**
   * create instance.
   * @param {MemberExpressionNode} leftNode left node.
   * @param {string} operator only "=".
   * @param {ASTNode} rightNode right node.
   */
  constructor(leftNode, operator, rightNode) {
    super();

    assert(leftNode instanceof MemberExpressionNode, `leftNode must be MemberExpressionNode. leftNode = "${leftNode}"`);
    assert(operator === '=', `operator must be "=". operator = "${operator}"`);
    assert(rightNode instanceof ASTNode, `rightNode must be ASTNode. rightNode = "${rightNode}"`);

    this._node = {
      type: 'ExpressionStatement',
      expression: {
        type: 'AssignmentExpression',
        operator: operator,
        left: leftNode,
        right: rightNode
      }
    }
  };
}
