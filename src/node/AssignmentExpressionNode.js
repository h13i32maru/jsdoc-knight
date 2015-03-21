import assert from 'assert';
import ASTNode from './ASTNode.js';
import MemberExpressionNode from './MemberExpressionNode.js';

export default class AssignmentExpressionNode extends ASTNode {
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
