import ASTNode from './ASTNode.js';

export default class LiteralNode extends ASTNode {
  constructor(value) {
    super();

    this._node = {
      type: 'Literal',
      raw: '' + value,
      value: value
    };
  }
}
