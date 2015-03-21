import ASTNode from './ASTNode.js';
import assert from 'assert';

export default class IdentifierNode extends ASTNode {
  constructor(name) {
    super();

    assert(name, `name must be specified. name = "${name}"`);
    this._node = {type: 'Identifier', name: name};
  }
}
