import FunctionExpressionNode from './FunctionExpressionNode.js';

export default class FunctionDeclarationNode extends FunctionExpressionNode{
  constructor(name){
    super(name);
    this._node.type = 'FunctionDeclaration';
  }
}
